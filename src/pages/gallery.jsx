import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState, useRef } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntroImg from '@/components/IntroImg';
import ModalImg from '@/components/ModalImg';


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
// const imgSrc = [
//     '/img/anni.jpg',
//     '/img/wed.jpg',
//     '/img/yb.jpg',
//     '/img/anni.jpg',
//     '/img/wed.jpg',
//     '/img/avt.jpg',
//     '/img/avt.jpg',
//     '/img/yb.jpg',
// ]

const imgSrc = {
    wedding: [
        {
            src: '/img/wed/wed.webp',
            category: 'wedding',
            time: '2021-09-02'
        },
        {
            src: '/img/wed/wed2.webp',
            category: 'wedding',
            time: '2021-09-15'
        },
        {
            src: '/img/wed/wed3.webp',
            category: 'wedding',
            time: '2021-09-12'
        },
        {
            src: '/img/wed/wed4.webp',
            category: 'wedding',
            time: '2021-09-04'
        },
        {
            src: '/img/wed/wed5.webp',
            category: 'wedding',
            time: '2021-09-02'
        }
    ],
    yearbook: [
        {
            src: '/img/yb/yb.webp',
            category: 'yearbook',
            time: '2021-09-01'
        },
        {
            src: '/img/yb/yb2.webp',
            category: 'yearbook',
            time: '2021-09-09'
        },
        {
            src: '/img/yb/yb3.webp',
            category: 'yearbook',
            time: '2021-09-09'
        },
        {
            src: '/img/yb/yb4.webp',
            category: 'yearbook',
            time: '2021-09-06'
        },
        {
            src: '/img/yb/yb5.webp',
            category: 'yearbook',
            time: '2021-09-08'
        }
    ],
    anniversary: [
        {
            src: '/img/anni/anni.webp',
            category: 'anniversary',
            time: '2021-09-03'
        },
        {
            src: '/img/anni/anni2.webp',
            category: 'anniversary',
            time: '2021-09-12'
        },
        {
            src: '/img/anni/anni3.webp',
            category: 'anniversary',
            time: '2021-09-23'
        },
        {
            src: '/img/anni/anni4.webp',
            category: 'anniversary',
            time: '2021-09-05'
        },
        {
            src: '/img/anni/anni5.webp',
            category: 'anniversary',
            time: '2021-09-07'
        }
    ],
}

function Gallery() {

    const router = useRouter();
    const { categoryRequire } = router.query; 
    console.log(categoryRequire);  
    // transform json to array

    const [imgWed, setImgWed] = useState(imgSrc.wedding);
    const [imgYb, setImgYb] = useState(imgSrc.yearbook);
    const [imgAnni, setImgAnni] = useState(imgSrc.anniversary);
    const [category, setCategory] = useState(categoryRequire || 'All');

    // Modal
    const [statusModal, setStatusModal] = useState(false);
    const [attrModal, setAttrModal] = useState({});


    const [statusSortBox, setStatusSortBox] = useState(false);
    const [currentSort, setCurrentSort] = useState('Newest');

    const [gallery, dispatch] = useReducer(reducer, initialState);

    // const [imgArr, setImgArr] = useState([]);
    // const imgWedRef = useRef(imgSrc.wedding);
    // const imgYbRef = useRef(imgSrc.yearbook);
    // const imgAnniRef = useRef(imgSrc.anniversary);
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
            console.log(categoryRef);
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