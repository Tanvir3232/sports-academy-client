import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Slider.css'
import slide1 from '../../../assets/images/cricket.png'
import slide2 from '../../../assets/images/football.png'
import slide3 from '../../../assets/images/hocky.png'
import slide4 from '../../../assets/images/batminton.png'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

const Slider = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className="hero min-h-screen " style={{ backgroundImage: `url(${slide1})` }}>
                    <div className="hero-overlay bg-opacity-80"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Master the Gentleman's Game</h1>
                            <p className="mb-5">Master the art of cricket with our expert coaching, advanced facilities, and a supportive community for players of all ages and skill levels.</p>
                            <button className="btn btn-warning btn-outline btn-lg">Join Now</button>
                        </div>
                    </div>
                </div>

            </SwiperSlide>
            <SwiperSlide>
                <div className="hero min-h-screen " style={{ backgroundImage: `url(${slide2})` }}>
                    <div className="hero-overlay bg-opacity-80"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Kick, Score, Repeat!</h1>
                            <p className="mb-5">Experience top-notch training, tactical strategies, and a competitive environment as you strive to become a football champion at our premier academy.</p>
                            <button className="btn btn-warning btn-outline btn-lg">Join Now</button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="hero min-h-screen " style={{ backgroundImage: `url(${slide3})` }}>
                    <div className="hero-overlay bg-opacity-80"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Glide to Victory</h1>
                            <p className="mb-5">Harness your stickhandling finesse, teamwork abilities, and speed on the field through our comprehensive hockey programs led by experienced coaches</p>
                            <button className="btn btn-warning btn-outline btn-lg">Join Now</button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="hero min-h-screen " style={{ backgroundImage: `url(${slide4})` }}>
                    <div className="hero-overlay bg-opacity-80"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Rise Above the Net</h1>
                            <p className="mb-5">Improve your technique, agility, and mental agility in badminton, guided by our expert coaches and cutting-edge facilities at XYZ Sports Academy.</p>
                            <button className="btn btn-warning btn-outline btn-lg">Join Now</button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </Swiper>
    );
};

export default Slider;