import React from 'react'
import Link from 'next/link'

type Props = {}

const Footer = (props: Props) => {
    return (
        <>
            <footer id="footer">
                <div id="back-to-top" className="tooltip-gototop" title="Back to Top"></div>
                <div id="footer-widgets" className="grid">
                    <div className="footer-widget unit half">
                        <h5>Get In Touch</h5>
                        <p>The RCCG SHIFT Talent Hunt is a great opportunity to showcase your talents to a wide audience.
                            The competition is televised and streamed live online, so you have the chance to be seen by millions of people around the world.</p>
                        <p><span className="fa fa-map-marker"></span>Redemption City of God
                        </p>
                        <p><span className="fa fa-phone"></span>+447424483987, +2347060626135, +2348104238564
                        </p>
                        <p><span className="fa fa-paper-plane"></span>info@rccgshift.org
                        </p>
                    </div>
                    <div className="footer-widget unit half">
                        <h5>Quick Links</h5>
                        <ul className="footer-list">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/about">About SHIFT</Link>
                            </li>
                            <li>
                                <Link href="/vote">How to Vote</Link>
                            </li>
                            <li>
                                <Link href="/contestants">Contestants</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact and FAQs</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-info">
                    <div className="credits">Copyright RCCG SHIFT</div>
                    <ul className="social-icons footer-social">
                        <li>
                            <a href="https://www.facebook.com/people/Rccgshift/61551057372506/?mibextid=ibOpuV" className="fa fa-facebook-f tooltip-pink" title="Facebook">Facebook</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/rccgshift/?igsh=MTFtbWRybHRuNHp6dQ%3D%3D" className="fa fa-instagram tooltip-pink" title="Instagram">Instagram</a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/tag/rccgshift" className="fa fa-tiktok tooltip-pink" title="Tiktok">Tiktok</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer