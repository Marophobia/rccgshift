import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import GalleryImages from './components/images'


export const metadata = {
    title: "GALLERY | RCCG SHIFT",
    generator: 'GALLERY | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'GALLERY | RCCG SHIFT',
        title: 'GALLERY | RCCG SHIFT',

    },
    openGraph: {
        title: 'GALLERY | RCCG SHIFT',
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
                        <h1><span>Gallery</span></h1>
                    </div>
                    <div id="page-container">
                        <GalleryImages />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Contact