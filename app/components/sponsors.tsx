"use client"
import React from 'react'
import Autoplay from 'embla-carousel-autoplay';
import { useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '../../components/ui/carousel';

type Props = {}

const Sponsor = (props: Props) => {
    const plugin = React.useRef(Autoplay({ delay: 2500 }));
    return (
        <>
            <div className="grid">
                <div className="unit whole no-padding">
                    <div id="partners" className="owl-carousel">

                        <Carousel
                            plugins={[plugin.current]}
                            opts={{
                                loop: true,
                            }}

                            className="w-full"
                        >
                            <CarouselContent className='gap-5'>
                                <CarouselItem className="basis-[320px]">
                                    <img src="img/team-2.jpg" alt="" />
                                </CarouselItem>
                                <CarouselItem className="basis-[320px]">
                                    <img src="img/team-3.jpg" alt="" />
                                </CarouselItem>
                                <CarouselItem className="basis-[320px]">
                                    <img src="img/team-4.jpg" alt="" />
                                </CarouselItem>
                                <CarouselItem className="basis-[320px]">
                                    <img src="img/team-5.jpg" alt="" />
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Sponsor