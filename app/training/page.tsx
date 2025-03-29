import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import Training from './components/training'

export const metadata = {
    title: "Contestants Training | RCCG SHIFT",
    generator: 'Contestants Training | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'Contestants Training | RCCG SHIFT',
        title: 'Contestants Training | RCCG SHIFT',

    },
    openGraph: {
        title: 'Contestants Training | RCCG SHIFT',
        description: 'Waiting Room for Contestants Training 2025 | RCCG Shift',
        url: 'https://rccgshift.org/vote',
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