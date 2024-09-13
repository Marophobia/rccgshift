"use client"
import React from 'react'
import Autoplay from 'embla-carousel-autoplay';
import { useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '../../components/ui/carousel';
import Link from 'next/link';

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
                                    <Link href="https://qozeh.org.ng/">
                                        <img src="img/team-3.jpg" alt="" />
                                    </Link>
                                </CarouselItem>
                                <CarouselItem className="basis-[320px]">
                                    <Link href="https://rccgyayaglobal.org">
                                        <img src="img/team-4.jpg" alt="" />
                                    </Link>
                                </CarouselItem>
                                <CarouselItem className="basis-[320px]">
                                    <Link href="https://www.stanbicibtcbank.com/">
                                        <img src="img/team-5.jpg" alt="" />
                                    </Link>
                                </CarouselItem>
                                <CarouselItem className="basis-[320px]">
                                    <Link href="https://qozeh.org.ng/">
                                        <img src="img/team-3.jpg" alt="" />
                                    </Link>
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