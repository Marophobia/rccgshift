import Image from 'next/image';
import React from 'react';

type Props = {};

const HomeEvent = (props: Props) => {
    return (
        <div
            className="container-fluid py-5 my-10 mx-0"
            style={{ backgroundImage: 'url(/img/bg_show.jpg)' }}
        >
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-6 min-h-[500px]">
                        <div className="position-relative h-100">
                            <Image
                                width={1000}
                                height={1000}
                                alt="event pic"
                                className="position-absolute w-100 h-100"
                                src="/img/opening.jpg"
                                style={{
                                    aspectRatio: '1200/600',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 pt-5 pb-lg-5">
                        <div className="hours-text p-4 p-lg-5 my-lg-5 bg-[#F5EFE2]">
                            <h6 className="d-inline-block text-white text-uppercase bg-primary py-1 px-2">
                                2024 International Shift Talent Hunt Season 2{' '}
                            </h6>
                            <h1 className="mb-4">Event Outline</h1>
                            <p>
                                The competition is divided into different
                                categories, including Music, dancing, and
                                Unusual Creativity.
                            </p>
                            <ul className="list-inline">
                                <li className="h6 py-1">
                                    <i className="far fa-circle text-primary mr-3 "></i>
                                    <strong className="text-[#DC7C3F]">
                                        DATE:
                                    </strong>{' '}
                                    July (Online Audition), Sept/Oct 2024 (Live
                                    Audition)
                                </li>
                                <li className="h6 py-1">
                                    <i className="far fa-circle text-primary mr-3"></i>
                                    <strong className="text-[#DC7C3F]">
                                        VENUE:
                                    </strong>{' '}
                                    Redemption City of God (Children Auditorium)
                                </li>
                                <li className="h6 py-1">
                                    <i className="far fa-circle text-primary mr-3"></i>
                                    <strong className="text-[#DC7C3F]">
                                        COMPETITION CATEGORIES:
                                    </strong>{' '}
                                    Music, Drama, Unusual Creativity
                                </li>
                                <li className="h6 py-1">
                                    <i className="far fa-circle text-primary mr-3"></i>
                                    <strong className="text-[#DC7C3F]">
                                        RULES:
                                    </strong>{' '}
                                    Participants Must be a verified and clear
                                    RCCG member
                                </li>
                                <li className="h6 py-1">
                                    <i className="far fa-circle text-primary mr-3"></i>
                                    <strong className="text-[#DC7C3F]">
                                        ASSESSMENT:
                                    </strong>{' '}
                                    60% for Judges, 40% for Fan Base Voting
                                </li>
                            </ul>
                            <a href="#" className="btn btn-primary mt-2">
                                ... SHINING FORTH
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeEvent;
