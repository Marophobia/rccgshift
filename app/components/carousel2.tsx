"use client"
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';

const Slider = () => {

    return (
        <>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                speed={600}
                className="mySwiper"
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >


                <SwiperSlide>
                    <div className="sliderItem">
                        <div className="onTop">
                            <div className="overlay sliderCaptionContainer">
                                <div className="ns_slideContent">
                                    <div className="pt-10">
                                        <Link href={'/register'}>
                                            <h4 className="animated slideInRight py-7 px-10 mb-0" style={{ background: "#F5245F", display: "inline-block" }}>
                                                {/* RCCG INT&apos;L SHIFT TALENT HUNT */}
                                                CLICK TO REGISTER NOW!
                                            </h4>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className="sliderItem1">
                        <div className='onTop'>
                            <div className="overlay sliderCaptionContainer">
                                <div className="ns_slideContent">
                                    <div className="pt-10">
                                        <h4 className="animated slideInRight py-7 px-10 mb-0" style={{ background: "#F5245F", display: "inline-block" }}>
                                            MUSIC | DRAMA | UNUSUAL CREATIVITY
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="sliderItem2">
                        <div className='onTop'>
                            <div className="overlay sliderCaptionContainer">
                                <div className="ns_slideContent">
                                    <div className="pt-10">
                                        <h4 className="animated slideInRight py-7 px-10 mb-0" style={{ background: "#F5245F", display: "inline-block" }}>
                                            RCCG SHIFT - YOU MUST SHINE!
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;
