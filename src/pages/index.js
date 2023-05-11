import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
// import { useEffect } from 'react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from '@/styles/Home.module.css'
import IntroImg from '@/components/IntroImg'
import ModalImg from '@/components/ModalImg'

export default function Home() {

  // Modal
  const [statusModal, setStatusModal] = useState(false);
  const [attrModal, setAttrModal] = useState({});

  function openModal(e) {
    setStatusModal(true);
    setAttrModal({
      src: e.target.src,
      alt: e.target.alt,
    });
  }
  // End Modal

  const galleryItemRef = useRef(null)

  useEffect(() => {
    if (galleryItemRef.current) {
      const galleryItems = galleryItemRef.current.querySelectorAll('.gallery__item')
      const galleryItemImgs = galleryItemRef.current.querySelectorAll('.gallery__item__img')
      let indexCenter = 0
      galleryItems.forEach((item, i) => {
        if (item.classList.contains('item-center')) {
          console.log(i)
          indexCenter = i
        }
      })
      galleryItemImgs.forEach((img, index) => {
        console.log(img)
        img.onclick = () => {
          if (galleryItems[index].classList.contains('item-center')) {
            return
          } else {
            galleryItems.forEach((item, i) => {
              if (item.classList.contains('item-center')) {
                console.log(i)
                indexCenter = i
              }
            })
            galleryItems[indexCenter].classList.remove('item-center')
            // console.log('clicked')
            galleryItems[index].classList.add('item-center')
            if (galleryItems[index].classList.contains('item-left')) {
              galleryItems[index].classList.remove('item-left')
              galleryItems[indexCenter].classList.add('item-left')
            } else {
              galleryItems[index].classList.remove('item-right')
              galleryItems[indexCenter].classList.add('item-right')
            }
          }
        }
      })
    }
  }, [galleryItemRef])
  return (
    <>
      <Head>
        <title>Photography</title>
        <meta name="description" content="Photography" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <Header />

      {
        statusModal &&
        <ModalImg
          src={attrModal.src}
          alt={attrModal.alt}
          setStatusModal={setStatusModal}
        />
      }
      <main>
        <IntroImg src="/img/wed_intro.jpg" />
        <div className='intro-para'>
          <h1>Your wedding day is the biggest day in your life</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
            <br />
            dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
            <br />
            sit amet consectetur adipisicing elit amet consectetur adipisicing elit
          </p>
          <Link href='/contact' className='btn-contact'>
            Contact
          </Link>
        </div>
        <div className='gallery'>
          <div ref={galleryItemRef} className='gallery__items'>
            <div className='gallery__item item-left'>
              <h1 className='gallery__item__title'>Anniversary</h1>
              <div className='line'></div>
              <div className='btn-viewAll'>
                <Link href={{ pathname: '/gallery', query: { categoryRequire: 'Anniversary' } }}>
                  View All
                </Link>
              </div>
              <div className='gallery__item__img'>
                <Image
                  src='/img/anni/anni.webp'
                  alt='Anniversary'
                  width={500}
                  height={500}
                  layout="responsive"
                  // placeholder="blur"
                  priority={true}
                />
              </div>
            </div>
            <div className='gallery__item item-center'>
              <h1 className='gallery__item__title'>Weddings</h1>
              <div className='line'></div>
              <div className='btn-viewAll'>
                <Link href={{ pathname: '/gallery', query: { categoryRequire: 'Weddings' } }}>
                  View All
                </Link>
              </div>
              <div className='gallery__item__img'>
                <Image
                  src='/img/wed/wed.webp'
                  alt='Wedding'
                  width={500}
                  height={500}
                  layout="responsive"
                  // placeholder="blur"
                  priority={true}
                />
              </div>
            </div>
            <div className='gallery__item item-right'>
              <h1 className='gallery__item__title'>Yearbook</h1>
              <div className='line'></div>
              <div className='btn-viewAll'>
                <Link href={{ pathname: '/gallery', query: { categoryRequire: 'Yearbooks' } }}>
                  View All
                </Link>
              </div>
              <div className='gallery__item__img'>
                <Image
                  src='/img/yb/yb.webp'
                  alt='Yearbook'
                  width={500}
                  height={500}
                  layout="responsive"
                  // placeholder="blur"
                  priority={true}
                />
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
            <br />
            dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
          </p>
          <Link href='/contact' className='btn-contact'>
            Contact
          </Link>
        </div>
        <div className='about'>
          <div className='about__para'>
            <h2 className='signature'>Huu Bao</h2>
            <h1 className='about__para__title'>A little bit about me</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
              dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
              dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
            </p>
            <Link href='/contact' className='btn-contact'>
              Contact
            </Link>
          </div>
          <div className='about__img'>
            <Image
              src='/img/avt.jpg'
              alt='About'
              width={500}
              height={500}
              layout="responsive"
              // placeholder="blur"
              priority={true}
              onClick={(e) => openModal(e)}
            />
          </div>
        </div>
        <div className='reviews'>
          <div className='reviews__items'>
            <div className='reviews__item'>
              <div className='reviews__item__img'>
                <Image
                  src='/img/wed/wed.webp'
                  alt='About'
                  width={500}
                  height={500}
                  layout="responsive"
                  // placeholder="blur"
                  priority={true}
                  onClick={(e) => openModal(e)}
                />
              </div>
              <div className='reviews__item__para'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
                  dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
                  sit amet consectetur adipisicing elit amet consectetur adipisicing elit
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
                  dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
                  sit amet consectetur adipisicing elit amet consectetur adipisicing elit
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
                  dolor sit amet consectetur adipisicing elit amet consectetur adipisicing elit
                </p>
                <h2 className='signature'>Huu Trong</h2>
              </div>
            </div>
          </div>
          <div className='btn-reviews'>
            <div className='btn-reviews__left'>
              <i className='fas fa-chevron-left'></i>
            </div>
            <div className='btn-reviews__right'>
              <i className='fas fa-chevron-right'></i>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
