'use client';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../components/ui/carousel';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {};

const CarouselHero = (props: Props) => {
    const plugin = React.useRef(Autoplay({ delay: 3000 }));
    return (
        <div className="w-full mx-auto snap-start">
            <Carousel
                className="rounded-lg overflow-hidden"
                plugins={[plugin.current]}
                opts={{
                    loop: true,
                }}
                // onMouseEnter={plugin.current.stop}
                // onMouseLeave={plugin.current.reset}
            >
                <div className="slider-container">
                    <div className="home-slider">
                        <CarouselContent>
                            <CarouselItem className="ns_nerveSlider">
                                <div>
                                    <Image
                                        width={1920}
                                        height={1080}
                                        src="/img/carousel-1.jpg"
                                        data-animation="image-zoom scale-right"
                                        alt=""
                                        className=""
                                    />
                                    <div className="ns_slideContent">
                                        <div className="top-left">
                                            <h1 className="animated slideInRight">
                                                Register
                                            </h1>
                                            <p className="animated slideInRight">
                                                <span>
                                                    {' '}
                                                    RCCG INT&apos;L SHIFT TALENT
                                                    HUNT
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="ns_nerveSlider">
                                <div>
                                    <img
                                        src="/img/carousel-2.jpg"
                                        data-animation="image-zoom scale-right"
                                        alt=""
                                    />
                                    <div className="ns_slideContent">
                                        <div className="bottom-right">
                                            <h1 className="animated slideInRight">
                                                Register
                                            </h1>
                                            <p className="animated slideInRight">
                                                <span>
                                                    EARLY BIRD REGISTRATION,
                                                    ₦5,000 FEBRUARY ONLY
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="ns_nerveSlider">
                                <div>
                                    <img
                                        src="/img/carousel-3.jpg"
                                        data-animation="image-zoom scale-left"
                                        alt=""
                                    />
                                    <div className="ns_slideContent">
                                        <div className="top-right">
                                            <h1 className="animated slideInRight">
                                                Register
                                            </h1>
                                            <p className="animated slideInRight">
                                                <span>
                                                    MUSIC | DRAMA | UNUSUAL
                                                    CREATIVITY
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default CarouselHero;
