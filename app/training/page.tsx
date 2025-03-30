import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import Training from './components/training'

export const metadata = {
    generator: 'Contestant Training | RCCG SHIFT',
    applicationName: 'Contestant Training | RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    keywords: ['RCCG', 'RCCGYAYA', 'The redeemed christian church of God', 'Young Adults and Youth Church', 'YAYA', 'Youths', 'church', 'international', 'Pst Belemina Obunge', 'Pastor', 'Pst E.A Adeboye', 'Daddy G.O', 'RCCG SHIFT', 'SHIFT', 'Talent Hunt', 'Show'],
    authors: [{ name: 'Maro Orode' }],
    creator: 'Maro orode',
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
        card: 'RCCG SHIFT',
        title: 'RCCG SHIFT',
        description: 'Contestant Training of the RCCG Shift Talent Hunt 2025',
        creator: 'Maro orode',
        images: ['/training.jpg'],
    },
    openGraph: {
        title: 'RCCG SHIFT',
        description: 'Contestant Training of the RCCG Shift Talent Hunt 2025',
        url: 'https://rccgshift.org',
        siteName: 'RCCG SHIFT',
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


const ContestantTraining = async () => {

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Contestants Training</span></h1>
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

export default ContestantTraining