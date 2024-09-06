import Image from 'next/image';
import React from 'react';

type Props = {};

const About = (props: Props) => {
    return (
        <>
            {/* <div className="container py-5 mt-24 bg-blue-600 w-100">
                <div className="container py-5">
                    <div className="flex items-center">
                        <div className="pb-5 lg:pb-0">
                            <Image
                                width={160}
                                height={40}
                                className=" w-100"
                                src="/images/admin/card/pattern-dark.png"
                                alt="rccg shift"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h6 className="d-inline-block text-primary text-uppercase bg-light py-1 px-2">
                                About{' '}
                            </h6>
                            <h1 className="mb-4">
                                RCCG INTERNATIONAL SHIFT TALENT HUNT
                            </h1>
                            <p className="pl-4 border-left border-primary text-justify">
                                The is a talent competition organized by the
                                Redeemed Christian Church of God (RCCG) Young
                                Adults and Youth Affairs (YAYA). It is a
                                platform for young people to showcase their
                                talents and to be rewarded for their creativity
                                and excellence. The RCCG Int&apos;l Shift Talent
                                Hunt is open to all young people between the
                                ages of 13 and 45 who are members of the RCCG.
                                The competition is divided into different
                                categories, including Music, dancing, and
                                Unusual Creativity.
                            </p>
                            <div className="row pt-3">
                                <div className="col-6">
                                    <div className="bg-light text-center p-4">
                                        <h3
                                            className="display-4 text-primary"
                                            data-toggle="counter-up"
                                        >
                                            12
                                        </h3>
                                        <h6 className="text-uppercase">
                                            Judges
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="bg-light text-center p-4">
                                        <h3
                                            className="display-4 text-primary"
                                            data-toggle="counter-up"
                                        >
                                            639
                                        </h3>
                                        <h6 className="text-uppercase">
                                            Contestants
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div
                className="w-full py-5"
                style={{
                    marginTop: '0px',
                    backgroundImage: 'url(/img/show.jpg)',
                }}
            >
                <div className="container mx-auto py-5">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full lg:w-1/2 pb-5 lg:pr-8 lg:pb-0">
                            <img
                                className="img-fluid w-100"
                                src="/img/about.jpg"
                                alt=""
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h6 className="inline-block text-primary text-xs uppercase bg-gray-100 py-1 px-2">
                                About
                            </h6>
                            <h1 className="mb-4 text-4xl font-bold">
                                RCCG INTERNATIONAL SHIFT TALENT HUNT
                            </h1>
                            <p className="pl-4 border-l-4 border-primary text-justify">
                                The is a talent competition organized by the
                                Redeemed Christian Church of God (RCCG) Young
                                Adults and Youth Affairs (YAYA). It is a
                                platform for young people to showcase their
                                talents and to be rewarded for their creativity
                                and excellence. The RCCG Int&apos;l Shift Talent
                                Hunt is open to all young people between the
                                ages of 13 and 45 who are members of the RCCG.
                                <br />
                                <br />
                                The competition is divided into different
                                categories, including Music, dancing, and
                                Unusual Creativity.
                            </p>
                            <div className="row pt-3">
                                <div className="col-6">
                                    <div className="bg-light text-center p-4">
                                        <h3
                                            className="display-4 text-primary"
                                            data-toggle="counter-up"
                                        >
                                            12
                                        </h3>
                                        <h6 className="text-uppercase">
                                            Judges
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="bg-light text-center p-4">
                                        <h3
                                            className="display-4 text-primary"
                                            data-toggle="counter-up"
                                        >
                                            639
                                        </h3>
                                        <h6 className="text-uppercase">
                                            Contestants
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
