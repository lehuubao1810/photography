import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useReducer, useState, useRef } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntroImg from '@/components/IntroImg';


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
            src: '/img/wed.jpg',
            catagory: 'wedding',
            time: '2021-09-02'
        },
    ],
    yearbook: [
        {
            src: '/img/yb.jpg',
            catagory: 'yearbook',
            time: '2021-09-01'
        },
    ],
    anniversary: [
        {
            src: '/img/anni.jpg',
            catagory: 'anniversary',
            time: '2021-09-03'
        },
        
    ],
}

function Gallery() {

    const [imgWed, setImgWed] = useState(imgSrc.wedding);
    const [imgYb, setImgYb] = useState(imgSrc.yearbook);
    const [imgAnni, setImgAnni] = useState(imgSrc.anniversary);
    const [catagory, setCatagory] = useState('All');

    const [statusSortBox, setStatusSortBox] = useState(false);
    const [currentSort, setCurrentSort] = useState('Newest');

    const [gallery, dispatch] = useReducer(reducer, initialState);

    // const [imgArr, setImgArr] = useState([]);
    // const imgWedRef = useRef(imgSrc.wedding);
    // const imgYbRef = useRef(imgSrc.yearbook);
    // const imgAnniRef = useRef(imgSrc.anniversary);
    const imgAllRef = useRef([]);

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
        switch (catagory) {
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
      }, [catagory, currentSort]);


    function handleChange(e, setState) {
        setState(e.target.textContent);
        // add class active
        e.target.parentElement.querySelectorAll('.active').forEach((el) => {
            el.classList.remove('active');
        }
        );
        e.target.classList.add('active');
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
            <IntroImg src="/img/yb.jpg" />

            <main>
                <div className="gallery">
                    <div className="gallery__tools">
                        <div className="catagory">
                            <div
                                className="catagory__item active"
                                onClick={(e) => handleChange(e, setCatagory)}
                            >
                                All
                            </div>
                            <div
                                className="catagory__item"
                                onClick={(e) => handleChange(e, setCatagory)}
                            >
                                Weddings
                            </div>
                            <div
                                className="catagory__item"
                                onClick={(e) => handleChange(e, setCatagory)}
                            >
                                Yearbooks
                            </div>
                            <div
                                className="catagory__item"
                                onClick={(e) => handleChange(e, setCatagory)}
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
                                        catagory={img.catagory}
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
                                        catagory={img.catagory}
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
                                        catagory={img.catagory}
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
                                        catagory={img.catagory}
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