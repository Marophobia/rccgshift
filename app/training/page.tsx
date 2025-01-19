import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Training from './components/training'


export const metadata = {
    title: "SHIFT EXECUTIVE TRAINING | LOGIN",
    generator: 'SHIFT EXECUTIVE TRAINING | LOGIN',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    metadataBase: new URL('https://rccgshift.org/images'),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US',
            'de-DE': '/de-DE',
        },
    },
    twitter: {
        card: 'SHIFT EXECUTIVE TRAINING | LOGIN',
        title: 'SHIFT EXECUTIVE TRAINING | LOGIN',
        description: 'Login to the Online 3-Day Workshop organized by the RCCG YAYA - SHIFT with the theme: EMPOWERING TALENT CHAMPIONS',
        creator: 'Shift',
        images: ['/training.jpg'],
    },
    openGraph: {
        title: 'SHIFT EXECUTIVE TRAINING | LOGIN',
        description: 'Login to the Online 3-Day Workshop organized by the RCCG YAYA - SHIFT with the theme: EMPOWERING TALENT CHAMPIONS',
        url: 'https://rccgshift.org',
        siteName: 'SHIFT EXECUTIVE TRAINING | LOGIN',
        images: [
            {
                url: '/training.jpg',
                width: 800,
                height: 600,
            },
        ],
        type: 'website',
    },
}


const ShiftTraining = async () => {

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Shift Executive Training</span></h1>
                    </div>
                    <div id="page-container">
                        <Training />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default ShiftTraining