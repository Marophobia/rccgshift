'use client';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './ui/button';
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
                <CarouselContent>
                    <CarouselItem>
                        <div className="relative min-h-[80dvh]">
                            <img
                                className="position-absolute w-100 h-100"
                                src="/img/carousel-1.jpg"
                                style={{
                                    aspectRatio: '1200/600',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3 max-w-[900px]">
                                    <h3 className="text-capitalize mb-3 text-2xl text-[#F5EFE2]">
                                        RCCG INT&apos;L SHIFT TALENT HUNT{' '}
                                    </h3>
                                    <a
                                        className="btn btn-outline-light py-3 px-4 mt-3 animate__animated animate__fadeInUp"
                                        href="signup.html"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative min-h-[80dvh]">
                            <Image
                                src="/img/carousel-2.jpg"
                                alt="Slide 2"
                                width={1200}
                                height={600}
                                className="position-absolute w-100 h-100"
                                style={{
                                    aspectRatio: '1200/600',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3 max-w-[900px]">
                                    <h3 className="text-capitalize mb-3 text-2xl text-[#F5EFE2]">
                                        EARLY BIRD REGISTRATION, ₦5,000 FEBRUARY
                                        ONLY
                                    </h3>
                                    <a
                                        className="btn btn-outline-light py-3 px-4 mt-3 animate__animated animate__fadeInUp"
                                        href="signup.html"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative min-h-[80dvh]">
                            <Image
                                src="/img/carousel-3.jpg"
                                alt="Slide 3"
                                width={1200}
                                height={600}
                                className="position-absolute w-100 h-100"
                                style={{
                                    aspectRatio: '1200/600',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3 max-w-[900px]">
                                    <h3 className="text-capitalize mb-3 text-2xl text-[#F5EFE2]">
                                        MUSIC | DRAMA | UNUSUAL CREATIVITY
                                    </h3>
                                    <a
                                        className="btn btn-outline-light py-3 px-4 mt-3 animate__animated animate__fadeInUp"
                                        href="signup.html"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-white hover:text-primary transition-colors">
                    <ChevronLeftIcon color="black" className="w-6 h-6" />
                    <span className="sr-only">Previous</span>
                </CarouselPrevious>
                <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 text-white hover:text-primary transition-colors">
                    <ChevronRightIcon color="black" className="w-6 h-6" />
                    <span className="sr-only">Next</span>
                </CarouselNext>
            </Carousel>
        </div>
    );
};

export default CarouselHero;
