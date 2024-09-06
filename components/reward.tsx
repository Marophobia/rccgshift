'use client';
import Image from 'next/image';
import { plugin } from 'postcss';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { Separator } from './ui/separator';

type Props = {};

const Reward = (props: Props) => {
    const plugin = React.useRef(Autoplay({ delay: 2500 }));

    return (
        <div className="container-fluid bg-pricing my-10 mx-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 min-h-[500px]">
                        <div className="position-relative h-100">
                            <Image
                                width={1000}
                                height={1000}
                                alt="reward"
                                className="position-absolute w-100 h-100"
                                src="/img/pricing.jpg"
                                style={{
                                    aspectRatio: '1200/600',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-7 pt-5 pb-lg-5">
                        <div className="pricing-text bg-light p-4 p-lg-5 my-lg-5">
                            <Carousel
                                plugins={[plugin.current]}
                                opts={{
                                    loop: true,
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="snap-x">
                                    <CarouselItem className="relative bg-white basis-[80%] snap-center">
                                        <div className="d-flex align-items-center justify-content-between border-bottom border-primary p-4">
                                            <h1 className="display-4 mb-0">
                                                <small className="align-top text-muted font-weight-medium text-[22px] line-[45px]">
                                                    ₦
                                                </small>
                                                10M
                                                <small className="align-bottom text-muted font-weight-medium text-[16px] line-[40px]">
                                                    .
                                                </small>
                                            </h1>
                                            <h5 className="text-primary text-uppercase m-0">
                                                Winner
                                            </h5>
                                        </div>
                                        <div className="p-4">
                                            <p>
                                                <i className="fa fa-check text-success mr-2"></i>
                                                Cash & Deals
                                            </p>
                                            <p>
                                                <i className="fa fa-check text-success mr-2"></i>
                                                A New Car
                                            </p>
                                            <p>
                                                <i className="fa fa-check text-success mr-2"></i>
                                                3 Nights Holiday Gateaway
                                            </p>
                                            <p>
                                                <i className="fa fa-check text-success mr-2"></i>
                                                Promotional Deals
                                            </p>
                                            <p>
                                                <i className="fa fa-check text-success mr-2"></i>
                                                Endorsements{' '}
                                            </p>
                                            <p>
                                                <i className="fa fa-check text-success mr-2"></i>
                                                Branding
                                            </p>
                                            <a
                                                href="#"
                                                className="btn btn-primary my-2"
                                            >
                                                1st Prize Winner Cash Price
                                            </a>
                                        </div>
                                    </CarouselItem>
                                    <Separator orientation="vertical" />
                                    <CarouselItem className="relative bg-white basis-[80%] snap-center">
                                        <div className="d-flex align-items-center justify-content-between border-bottom border-primary p-4">
                                            <h1 className="display-4 mb-0">
                                                <small className="align-top text-muted font-weight-medium text-[22px] line-[45px]">
                                                    ₦
                                                </small>
                                                1M
                                                <small className="align-bottom text-muted font-weight-medium text-[16px] line-[40px]">
                                                    .
                                                </small>
                                            </h1>
                                            <h5 className="text-primary text-uppercase m-0">
                                                1st RUNNER
                                            </h5>
                                        </div>
                                        <div className="p-4">
                                            <p>
                                                <i className="fa fa-check text-success mr-2"></i>
                                                One Million Naira Cash Prize
                                            </p>
                                            <a
                                                href="#"
                                                className="btn btn-primary my-2"
                                            >
                                                1st Runner up{' '}
                                            </a>
                                        </div>
                                    </CarouselItem>
                                    <Separator orientation="vertical" />
                                    <CarouselItem className="relative bg-white basis-[80%] snap-center">
                                        <div className="d-flex align-items-center justify-content-between border-bottom border-primary p-4">
                                            <h1 className="display-4 mb-0">
                                                <small className="align-top text-muted font-weight-medium text-[22px] line-[45px]">
                                                    ₦
                                                </small>
                                                500k
                                                <small className="align-bottom text-muted font-weight-medium text-[16px] line-[40px]">
                                                    .
                                                </small>
                                            </h1>
                                            <h5 className="text-primary text-uppercase m-0">
                                                2nd RUNNER
                                            </h5>
                                        </div>
                                        <div className="p-4">
                                            <p>
                                                <i className="fa fa-check text-success mr-2"></i>
                                                Five Hundred Thousand Naira
                                            </p>
                                            <a
                                                href="#"
                                                className="btn btn-primary my-2"
                                            >
                                                1st Runner up
                                            </a>
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reward;
