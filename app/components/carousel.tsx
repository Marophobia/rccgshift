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
                            <CarouselItem>
                                <img src="/img/carousel-1.jpg" data-animation="image-zoom scale-right" alt="" />
                                <div className="ns_slideContent">
                                    <div className="top-left">
                                        <h1 className="animatedmedium slideInLeft">Welcome to Ombre</h1>
                                        <p className="animated slideInLeft"><span>Legam e officia ita nae</span></p>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <img src="/img/carousel-2.jpg" data-animation="image-zoom scale-right" alt="" />
                                <div className="ns_slideContent">
                                    <div className="bottom-right">
                                        <h1 className="animatedmedium slideInRight">Dolore admod</h1>
                                        <p className="animated slideInRight"><span>Se quis incididunt appellat summis</span></p>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <img src="/img/carousel-3.jpg" data-animation="image-zoom scale-left" alt="" />
                                <div className="ns_slideContent">
                                    <div className="top-right">
                                        <h1 className="animatedmedium slideInRight">Ut eram iudicem</h1>
                                        <p className="animated slideInRight"><span>Cupidatat velit fugiat summis ab dolor</span></p>
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
