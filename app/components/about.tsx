import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

type Props = {};

const About = (props: Props) => {
    return (
        <>
            <div className="grid">
                <div className="unit two-thirds">
                    <h3 className="borderr">Register</h3>
                    <div className="responsive-img">
                        <img src="/img/about.jpg" alt="" />
                    </div>
                </div>
                <div className="unit one-third">
                    <p>
                        Shift is a talent competition organized by the Redeemed
                        Christian Church of God (RCCG) Young Adults and Youth
                        Affairs (YAYA). It is a platform for young people to
                        showcase their talents and to be rewarded for their
                        creativity and excellence. The RCCG Int&apos;l Shift
                        Talent Hunt is open to all (No Age limit) who are members of the RCCG
                        <br /> <br />
                        The competition is divided into different categories,
                        including Music, dancing, and Unusual Creativity.
                    </p>
                    <Link href={'/register'}><Button size="lg" style={{ background: "#F5245F" }}>Register for Season 3</Button></Link>

                    <ol className="rounded-list">
                        <li>
                            <span>4 Judges</span>
                        </li>
                        <li>
                            <span>Over 1,000 Contestants</span>
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
};

export default About;
