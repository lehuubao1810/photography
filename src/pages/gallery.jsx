import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useReducer } from 'react';

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
const imgSrc = [
    '/img/anni.jpg',
    '/img/wed.jpg',
    '/img/yb.jpg',
    '/img/anni.jpg',
    '/img/wed.jpg',
    '/img/avt.jpg',
    '/img/avt.jpg',
    '/img/yb.jpg',
]

function Gallery() {

    // const [gallery, dispatch] = useReducer(reducer, initialState);

    // useEffect(() => {
    //     for (let i = 0; i < imgSrc.length; i++) {
    //         const column = i % 4;
    //         switch (column) {
    //             case 0:
    //                 dispatch({
    //                     type: 'ADD_COL1',
    //                     payload: imgSrc[i]
    //                 })
    //                 break;
    //             case 1:
    //                 dispatch({
    //                     type: 'ADD_COL2',
    //                     payload: imgSrc[i]
    //                 })
    //                 break;
    //             case 2:
    //                 dispatch({
    //                     type: 'ADD_COL3',
    //                     payload: imgSrc[i]
    //                 })
    //                 break;
    //             case 3:
    //                 dispatch({
    //                     type: 'ADD_COL4',
    //                     payload: imgSrc[i]
    //                 })
    //                 break;
    //             default:
    //                 break;
    //       }
    //     }
    // }, [])   

    const [gallery, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const temp = [];
        for (let i = 0; i < imgSrc.length; i++) {
            const column = i % 4;
            switch (column) {
                case 0:
                    temp[0] = [...(temp[0] || []), imgSrc[i]];
                    break;
                case 1:
                    temp[1] = [...(temp[1] || []), imgSrc[i]];
                    break;
                case 2:
                    temp[2] = [...(temp[2] || []), imgSrc[i]];
                    break;
                case 3:
                    temp[3] = [...(temp[3] || []), imgSrc[i]];
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
    }, []);


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
                            <div className="catagory__item active">
                                All
                            </div>
                            <div className="catagory__item">
                                Weddings
                            </div>
                            <div className="catagory__item">
                                Yearbooks
                            </div>
                            <div className="catagory__item">
                                Anniversary
                            </div>
                        </div>
                        <div className="sort-box">
                            <div className="active">
                                <span>Time increasing</span>
                                <i className='fas fa-chevron-down'></i>
                            </div>

                            <div className="sort-box__options">
                                <div className="sort-box__item active">
                                    Time increasing
                                </div>
                                <div className="sort-box__item">
                                    Time decreasing
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gallery__content">
                        <div className="gallery__column">
                            {gallery.col1.map((img, index) => (
                                <div className="gallery__column__item" key={index}>
                                    <Image
                                        src={img}
                                        alt="gallery"
                                        width={300}
                                        height={300}
                                        layout="responsive"

                                    />
                                </div>
                            ))}
                        </div>
                        <div className="gallery__column">
                            {gallery.col2.map((img, index) => (
                                <div className="gallery__column__item" key={index}>
                                    <Image
                                        src={img}
                                        alt="gallery"
                                        width={300}
                                        height={300}
                                        layout="responsive"

                                    />
                                </div>
                            ))}
                        </div>
                        <div className="gallery__column">
                            {gallery.col3.map((img, index) => (
                                <div className="gallery__column__item" key={index}>
                                    <Image
                                        src={img}
                                        alt="gallery"
                                        width={300}
                                        height={300}
                                        layout="responsive"

                                    />
                                </div>
                            ))}
                        </div>
                        <div className="gallery__column">
                            {gallery.col4.map((img, index) => (
                                <div className="gallery__column__item" key={index}>
                                    <Image
                                        src={img}
                                        alt="gallery"
                                        width={300}
                                        height={300}
                                        layout="responsive"

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