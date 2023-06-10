"use client"
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntroImg from '@/components/IntroImg';
import ModalImg from '@/components/ModalImg';
import { db } from './data/firebase';


const initialState = {
    col1: [],
    col2: [],
    col3: [],
    col4: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_GALLERY":
            return {
                ...state,
                col1: action.payload.col1,
                col2: action.payload.col2,
                col3: action.payload.col3,
                col4: action.payload.col4,
            };
        default:
            return state;
    }
}

function Gallery() {

    const router = useRouter();
    const { categoryRequire } = router.query; 
    // transform json to array

    const [imgWed, setImgWed] = useState([]);
    const [imgYb, setImgYb] = useState([]);
    const [imgAnni, setImgAnni] = useState([]);
  
    useEffect(() => {
      const fetchData = () => {
        try {
          getData('wedding', setImgWed);
          getData('yearbook', setImgYb);
          getData('anniversary', setImgAnni);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu:', error);
        }
      };
  
      fetchData();
    }, []);
    async function getData(category, setCategory) {
      const docRef = doc(db, "images", category);
      const querySnapshot = await getDoc(docRef);
      // Trích xuất dữ liệu từ Firestore và cập nhật state
      if (querySnapshot.exists()) {
        const data = querySnapshot.data().img;
        if (data) {
          setCategory(data);
        } else {
          setCategory([]);
        }
  
      } else {
        console.log("No such document!");
      }
    }

    const [category, setCategory] = useState(categoryRequire || 'All');

    // Modal
    const [statusModal, setStatusModal] = useState(false);
    const [attrModal, setAttrModal] = useState({});


    const [statusSortBox, setStatusSortBox] = useState(false);
    const [currentSort, setCurrentSort] = useState('Newest');

    const [gallery, dispatch] = useReducer(reducer, initialState);

    const imgAllRef = useRef([]);
    const categoryRef = useRef(null);

    useEffect(() => {
        const newImgAll = [...imgWed, ...imgYb, ...imgAnni];
        // sort by date
        newImgAll.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
        });
        if (JSON.stringify(newImgAll) === JSON.stringify(imgAllRef.current)) {
            return; // thoát sớm nếu không có sự thay đổi
        }
        imgAllRef.current = newImgAll; // lưu trữ giá trị mới nhất của imgArr
        changeGallery(newImgAll);
    }, [imgWed, imgYb, imgAnni]);

    function changeGallery(imgArr) {
        const temp = [];
        for (let i = 0; i < imgArr.length; i++) {
            const column = i % 4;
            switch (column) {
                case 0:
                    temp[0] = [...(temp[0] || []), imgArr[i]];
                    break;
                case 1:
                    temp[1] = [...(temp[1] || []), imgArr[i]];
                    break;
                case 2:
                    temp[2] = [...(temp[2] || []), imgArr[i]];
                    break;
                case 3:
                    temp[3] = [...(temp[3] || []), imgArr[i]];
                    break;
                default:
                    break;
            }
        }
        dispatch({
            type: "SET_GALLERY",
            payload: {
                col1: temp[0] || [],
                col2: temp[1] || [],
                col3: temp[2] || [],
                col4: temp[3] || [],
            },
        });
    }


    useEffect(() => {
        let filteredArr = [];
        switch (category) {
            case 'All':
                filteredArr = imgAllRef.current;
                break;
            case 'Weddings':
                filteredArr = imgWed;
                break;
            case 'Yearbooks':
                filteredArr = imgYb;
                break;
            case 'Anniversary':
                filteredArr = imgAnni;
                break;
            default:
                break;
        }
        if (currentSort === 'Oldest') {
            filteredArr.sort((a, b) => new Date(a.time) - new Date(b.time));
        } else {
            filteredArr.sort((a, b) => new Date(b.time) - new Date(a.time));
        }
        changeGallery(filteredArr);
        setStatusSortBox(false);
    }, [category, currentSort]);

    useEffect(() => {
        if (categoryRequire && categoryRef.current) {
            setCategory(categoryRequire);
            const categoryItems = categoryRef.current.querySelectorAll('.category__item');
            categoryItems.forEach((el) => {
                // remove class active
                el.classList.remove('active');
            });
            // add class active
            categoryItems.forEach((el) => {
                if (el.textContent === categoryRequire) {
                    el.classList.add('active');
                }
            })
        }
    }, [categoryRequire]);

    function handleChange(e, setState) {
        setState(e.target.textContent);
        // add class active
        e.target.parentElement.querySelectorAll('.active').forEach((el) => {
            el.classList.remove('active');
        }
        );
        e.target.classList.add('active');
    }

    function openModal(e) {
        setStatusModal(true);
        setAttrModal({
            src: e.target.src,
            alt: e.target.alt,
        });
    }

    return (
        <>
            <Head>
                <title>Gallery</title>
                <meta name="description" content="Gallery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>

            <Header />
            <IntroImg src="/img/yb/yb.webp" />

            {
                statusModal
                &&
                <ModalImg
                    src={attrModal.src}
                    alt={attrModal.alt}
                    setStatusModal={setStatusModal}
                />
            }


            <main>
                <div className="gallery">
                    <div className="gallery__tools">
                        <div className="category" ref={categoryRef}>
                            <div
                                className="category__item active"
                                onClick={(e) => handleChange(e, setCategory)}
                            >
                                All
                            </div>
                            <div
                                className="category__item"
                                onClick={(e) => handleChange(e, setCategory)}
                            >
                                Weddings
                            </div>
                            <div
                                className="category__item"
                                onClick={(e) => handleChange(e, setCategory)}
                            >
                                Yearbooks
                            </div>
                            <div
                                className="category__item"
                                onClick={(e) => handleChange(e, setCategory)}
                            >
                                Anniversary
                            </div>
                        </div>
                        <div className="sort-box">
                            <div className="current-status-sort"
                                onClick={() => setStatusSortBox(!statusSortBox)}
                            >
                                <span>{currentSort}</span>
                                <i className='fas fa-chevron-down'></i>
                            </div>

                            {
                                statusSortBox && (
                                    <div className="sort-box__options">
                                        <div
                                            className="sort-box__item"
                                            onClick={(e) => handleChange(e, setCurrentSort)}
                                        >
                                            Newest
                                        </div>
                                        <div
                                            className="sort-box__item"
                                            onClick={(e) => handleChange(e, setCurrentSort)}
                                        >
                                            Oldest
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className="gallery__content">
                        <div className="gallery__column">
                            {gallery.col1.map((img, index) => (
                                <div className="gallery__column__item" key={index}>
                                    <Image
                                        src={img.src}
                                        alt="gallery"
                                        width={300}
                                        height={300}
                                        layout="responsive"
                                        category={img.category}
                                        onClick={e => openModal(e)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="gallery__column">
                            {gallery.col2.map((img, index) => (
                                <div className="gallery__column__item" key={index}>
                                    <Image
                                        src={img.src}
                                        alt="gallery"
                                        width={300}
                                        height={300}
                                        layout="responsive"
                                        category={img.category}
                                        onClick={e => openModal(e)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="gallery__column">
                            {gallery.col3.map((img, index) => (
                                <div className="gallery__column__item" key={index}>
                                    <Image
                                        src={img.src}
                                        alt="gallery"
                                        width={300}
                                        height={300}
                                        layout="responsive"
                                        category={img.category}
                                        onClick={e => openModal(e)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="gallery__column">
                            {gallery.col4.map((img, index) => (
                                <div className="gallery__column__item" key={index}>
                                    <Image
                                        src={img.src}
                                        alt="gallery"
                                        width={300}
                                        height={300}
                                        layout="responsive"
                                        category={img.category}
                                        onClick={e => openModal(e)}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Gallery;