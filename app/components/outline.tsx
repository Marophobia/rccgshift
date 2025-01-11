import React from 'react'
import Image from 'next/image'
type Props = {}

const Outline = (props: Props) => {
    return (
        <>
            <div className="grid" >

                <div className="unit half">
                    <div className='lg:mt-36'>
                        <h3 className="borderr">Event Outline</h3>
                        {/* <h6>
                            The competition is divided into different
                            categories, including Music, dancing, and
                            Unusual Creativity.
                        </h6> */}
                        <ul className="list-inline">
                            <div className="py-6">
                                <div className="relative border-l" style={{ borderColor: "#F5245F" }}>
                                    {/* Timeline Item */}
                                    <div className="mb-8 pl-6 relative">
                                        <div className="absolute -left-3 w-6 h-6 rounded-full border-2 border-white" style={{background: "#F5245F"}}></div>
                                        <h3 className="text-lg font-medium ">
                                            January 2025
                                        </h3>
                                        <p>
                                            Shift Coordinators&apos; Training/Workshop by industry experts
                                        </p>
                                    </div>

                                    {/* Timeline Item */}
                                    <div className="mb-8 pl-6 relative">
                                        <div className="absolute -left-3 w-6 h-6 rounded-full border-2 border-white" style={{ background: "#F5245F" }}></div>
                                        <h3 className="text-lg font-medium ">
                                            1st February 2025
                                        </h3>
                                        <p>
                                            Shift Contestants&apos; Registration begins
                                        </p>
                                    </div>

                                    {/* Timeline Item */}
                                    <div className="mb-8 pl-6 relative">
                                        <div className="absolute -left-3 w-6 h-6 rounded-full border-2 border-white" style={{ background: "#F5245F" }}></div>
                                        <h3 className="text-lg font-medium ">
                                            April 2025
                                        </h3>
                                        <p>
                                            18 weeks Contestants Talent Training & Mentorship
                                        </p>
                                    </div>

                                    {/* Timeline Item */}
                                    <div className="mb-8 pl-6 relative">
                                        <div className="absolute -left-3 w-6 h-6 rounded-full border-2 border-white" style={{ background: "#F5245F" }}></div>
                                        <h3 className="text-lg font-medium ">
                                            June 2025
                                        </h3>
                                        <p>
                                            Audition 1 Selection across 6 Geopolitical Zones + Lagos
                                        </p>
                                    </div>

                                    {/* Timeline Item */}
                                    <div className="pl-6 relative">
                                        <div className="absolute -left-3 w-6 h-6 rounded-full border-2 border-white" style={{ background: "#F5245F" }}></div>
                                        <h3 className="text-lg font-medium ">
                                            Sept/Oct 2025
                                        </h3>
                                        <p>
                                            Int&apos;l Shift Talent Competition LIVE at IYC
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <li className="h6 py-3">
                                <i className="fa fa-arrow-right mr-3 "></i>
                                Venue: Redemption City of God (Children Auditorium)
                            </li>
                            <li className="h6 py-3">
                                <i className="fa fa-arrow-right mr-3 "></i>
                                Categories: Music, Drama, Unusual Creativity
                            </li>
                            <li className="h6 py-3">
                                <i className="fa fa-arrow-right mr-3 "></i>
                                Rules: Participants Must be a verified and clear RCCG member
                            </li>
                            <li className="h6 py-3">
                                <i className="fa fa-arrow-right mr-3 "></i>
                                Assessment: 60% for Judges, 40% for Fan Base Voting
                            </li>
                        </ul>
                    </div>



                </div>
                <div className="unit half">
                    <h6 style={{ background: "#3E3E3E" }} className='py-2 pl-2'>2025 International Shift Talent Hunt Season 3</h6>
                    <div className="position-relative h-100">
                        <Image
                            width={1000}
                            height={1000}
                            alt="event pic"
                            className="position-absolute w-100 h-100"
                            src="/img/opening.jpg"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Outline