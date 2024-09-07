import React from 'react'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
    return (
        <>
            <header id="header">
                <div id="header-top">
                    <div id="header-logo">
                        <Link href="/">
                            <img src="images/logo-white.png" alt="" />
                        </Link>
                    </div>
                    <div id="header-icons">
                        <ul className="social-icons">
                            <li>
                                <a href="https://www.facebook.com/people/Rccgshift/61551057372506/?mibextid=ibOpuV" className="fa fa-facebook-f tooltip-header" title="Facebook">Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/rccgshift/?igsh=MTFtbWRybHRuNHp6dQ%3D%3D" className="fa fa-instagram tooltip-header" title="Instagram">Instagram</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <a className="toggleMenu" href="#">MENU</a>
                    <nav>
                        <ul className="nav">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/about">About Shift</Link>
                            </li>
                            <li>
                                <Link href="/contestants">Contestants</Link>
                            </li>
                            <li>
                                <Link href="/results">Results</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header