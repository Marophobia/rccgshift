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
                    <h3 className="borderr">SHIFT Contestants, 2024</h3>
                    <div id="models" className="owl-carousel">

                        <Carousel
                            plugins={[plugin.current]}
                            opts={{
                                loop: true,
                            }}

                            className="w-full"
                        >
                            <CarouselContent className='gap-5'>
                                <Item image='/img/previous/1.jpg' text='Winner, Season 2' />
                                <Item image='/img/previous/2.jpg' text='1st Runner Up, Season 2' />
                                <Item image='/img/previous/3.jpg' text='2nd Runner Up, Season 2' />
                                <Item image='/img/previous/4.jpg' text='Finalist, Season 2' />
                                <Item image='/img/previous/5.jpg' text='Finalist, Season 2' />
                                <Item image='/img/previous/6.jpg' text='Finalist, Season 2' />
                                <Item image='/img/previous/7.jpg' text='Finalist, Season 2' />
                                <Item image='/img/previous/8.jpg' text='Finalist, Season 2' />
                                <Item image='/img/previous/9.jpg' text='Finalist, Season 2' />
                                <Item image='/img/previous/10.jpg' text='Finalist, Season 2' />
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default COntestants