import Image from 'next/image'

function IntroImg(props) {
    return (
        <div className='intro-img'>
          <Image
            src= {props.src}
            alt='Photography'
            width={500}
            height={500}
            layout="responsive"
            // placeholder="blur"
            priority={true}
          />
          <p className='intro-text'>
            Lorem ipsum dolor <span className='text-special-style'>consectetur</span> sit amet adipisicing elit.
          </p>
          <div className='scroll-down'>
            <p>Scroll down</p>
            <div className='scroll-down__line'></div>
          </div>
        </div>
    );
}

export default IntroImg;