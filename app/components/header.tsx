'use client';
import React from 'react';
import Link from 'next/link';

type Props = {};

const Header = (props: Props) => {
    const [nav, setNav] = React.useState(false);

    const handleToggle = () => {
        setNav(!nav); // Toggle the nav state
    };

    const mobileMenu = () => {

    }

    return (
        <>
            <header id="header">
                <div id="header-top">
                    <div id="header-logo">
                        <Link href="/">
                            <img src="../images/logo-white.png" alt="Logo" width="250px" />
                        </Link>
                    </div>
                    <div id="header-icons">
                        <ul className="social-icons">
                            <li>
                                <a
                                    href="https://www.facebook.com/people/Rccgshift/61551057372506/?mibextid=ibOpuV"
                                    className="fa fa-facebook-f tooltip-header"
                                    title="Facebook"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/rccgshift/?igsh=MTFtbWRybHRuNHp6dQ%3D%3D"
                                    className="fa fa-instagram tooltip-header"
                                    title="Instagram"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tiktok.com/tag/rccgshift"
                                    className="fa fa-tiktok tooltip-header"
                                    title="Instagram"
                                >
                                    TikTok
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{ background: "#111216" }}>
                    <div className="lg:hidden">
                        <ul className="nav" onClick={handleToggle}>
                            <li>
                                <a href="#">
                                    <div className="flex justify-between items-center">
                                        Menu <span className="fa fa-bars"></span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Toggle the nav-menu class based on the nav state */}
                    <div className={`nav-menu ${nav ? 'open' : ''} lg:block`}>
                        <nav>
                            <ul className="nav">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about">About Shift</Link>
                                </li>
                                <li>
                                    <Link href="/executives">Our Leaders</Link>
                                </li>
                                <li>
                                    <Link href="/judges">Judges</Link>
                                </li>
                                <li>
                                    <Link href="/contestants">Contestants</Link>
                                </li>
                                <li>
                                    <Link href="/results">Results</Link>
                                </li>
                                <li>
                                    <Link href="/gallery">Gallery</Link>
                                </li>
                                {/* <li className="relative group">
                                    <a href="#">Galleries</a>
                                    <ul
                                        className="absolute left-0 top-full mt-2 hidden w-48 bg-white shadow-lg group-hover:block"
                                    >
                                        <li>
                                            <a
                                                href="gallery-2-columns.html"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                            >
                                                Galleries - 2 Columns
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="gallery-3-columns.html"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                            >
                                                Galleries - 3 Columns
                                            </a>
                                        </li>
                                    </ul>
                                </li> */}

                                <li>
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
