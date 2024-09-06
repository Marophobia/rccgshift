'use client';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import ContestantCarousel from './contestant';

type Props = {};

const HomeCarousel = (props: Props) => {
    const plugin = React.useRef(Autoplay({ delay: 2500 }));
    return (
        <>
            <div className="container-fluid px-0 -mt-12">
                <div className="row mx-0 justify-content-center text-center my-9">
                    <div className="col-lg-6">
                        <h1>The Shift Contestants, 2023 </h1>
                    </div>
                </div>
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        <CarouselItem className="basis-[320px]">
                            <ContestantCarousel />
                        </CarouselItem>
                        <CarouselItem className="basis-[320px]">
                            <ContestantCarousel />
                        </CarouselItem>
                        <CarouselItem className="basis-[320px]">
                            <ContestantCarousel />
                        </CarouselItem>
                        <CarouselItem className="basis-[320px]">
                            <ContestantCarousel />
                        </CarouselItem>
                        <CarouselItem className="basis-[320px]">
                            <ContestantCarousel />
                        </CarouselItem>
                        <CarouselItem className="basis-[320px]">
                            <ContestantCarousel />
                        </CarouselItem>
                        <CarouselItem className="basis-[320px]">
                            <ContestantCarousel />
                        </CarouselItem>
                        <CarouselItem className="basis-[320px]">
                            <ContestantCarousel />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    );
};

export default HomeCarousel;
