import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import Details from './components/details'

export const metadata = {
    title: "CONTACT US | RCCG SHIFT",
    generator: 'CONTACT US | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'CoONTACT US | RCCG SHIFT',
        title: 'CONTACT US | RCCG SHIFT',

    },
    openGraph: {
        title: 'CONTACT US | RCCG SHIFT',
        description: 'Have an enquiry? Do not hesitate to contact us',
        url: 'https://rccgshift.org/contact',
    },
}


const Contact = async () => {

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Contact Us</span></h1>
                    </div>
                    <div id="page-container">
                        <Details />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Contact