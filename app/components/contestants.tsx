"use client"
import React from 'react'
import Autoplay from 'embla-carousel-autoplay';
import { useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '../../components/ui/carousel';
import Item from './item';

type Props = {}

const COntestants = (props: Props) => {
    const plugin = React.useRef(Autoplay({ delay: 2500 }));
    return (
        <>
            <div className="grid">
                <div className="unit whole">
                    <h3 className="borderr">SHIFT Contestants, 2023</h3>
                    <div id="models" className="owl-carousel">

                        <Carousel
                            plugins={[plugin.current]}
                            opts={{
                                loop: true,
                            }}

                            className="w-full"
                        >
                            <CarouselContent className='gap-5'>
                                <Item image='/img/service-1.jpg' />
                                <Item image='/img/service-2.jpg' />
                                <Item image='/img/service-3.jpg' />
                                <Item image='/img/service-4.jpg' />
                                <Item image='/img/service-5.jpg' />
                                <Item image='/img/service-6.jpg' />
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default COntestants