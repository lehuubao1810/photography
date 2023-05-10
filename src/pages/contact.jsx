import Head from 'next/head';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntroImg from '@/components/IntroImg';

function Contact() {
    return (
        <>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contact" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>

            <Header />
            <IntroImg src="/img/avt.jpg" />
            <main>
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
                        />
                    </div>
                </div>
                <div className="contact-info">
                    <h1 className="contact-info__title">Contact me</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fugiat voluptate unde quia perspiciatis ut numquam pariatur commodi iste possimus aliquam vero doloremque, sequi quas expedita quisquam odio nostrum quibusdam.
                    </p>
                    <h2>
                        Let's contact me with the information below
                        <br />
                        or
                        <br />
                        fill out the form and I will contact you as soon as possible
                    </h2>
                    <div className="contact-info__content">
                        <div className="contact-info__content__item">
                            <Image
                                src='/img/contact-bg.png'
                                alt='About'
                                width={250}
                                height={250}
                            ></Image>
                            <div className="info">
                                <div className="phone-number">
                                    <i className="fas fa-phone-alt"></i>
                                    <span>
                                        <a href="tel:0123456789">0123456789</a>
                                    </span>
                                </div>
                                <div className="email">
                                    <i className="fas fa-envelope"></i>
                                    <span>
                                        <a href="mailto:abc@gmail.com">abc@gmail.com</a>
                                    </span>
                                </div>
                                <div className="facebook">
                                    <i className="fab fa-facebook"></i>
                                    <span>
                                        <a href="https://www.facebook.com/abc">https://www.facebook.com/abc</a>
                                    </span>
                                </div>
                                <div className="address">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>
                                        123 Street, City, Country
                                    </span>
                                </div>
                                <div className="more">
                                    <p>
                                        If you want to contact quickly, 
                                        <br />
                                        please contact me via phone number or 
                                        email <span style={{color:'red'}}>❤</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="contact-info__content__item">
                            <form action="send" className='formInput'>
                                <span>Name</span>
                                <input type="text" placeholder="Name" required />
                                <span>Email</span>
                                <input type="email" placeholder="Email" required />
                                <span>Phone number</span>
                                <input type="text" placeholder='Phone number' required />
                                <span>Subject</span>
                                {/* <input className='subject' required  placeholder='Subject'></input> */}
                                <textarea className='subject' required placeholder='Subject' name="" id="" cols="30" rows="10"></textarea>
                                <button type='submit'>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Contact;