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
                        <h6>
                            The competition is divided into different
                            categories, including Music, dancing, and
                            Unusual Creativity.
                        </h6>
                        <ul className="list-inline">
                            <li className="h6 py-3">
                                <i className="fa fa-arrow-right mr-3 "></i>
                                Date: July (Online Audition), Sept/Oct 2024 (Live Audition)
                            </li>
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
                    <h6 style={{ background: "#3E3E3E" }} className='py-2 pl-2'>2024 International Shift Talent Hunt Season 2</h6>
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