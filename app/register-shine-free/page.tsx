import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import RegistrationForm from './components/form'


export const metadata = {
    title: "REGISTER FOR RCCG SHIFT SEASON 3 | 2025",
    generator: 'REGISTER FOR RCCG SHIFT SEASON 3 | 2025',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'REGISTER FOR RCCG SHIFT SEASON 3 | 2025',
        title: 'REGISTER FOR RCCG SHIFT SEASON 3 | 2025',

    },
    openGraph: {
        title: 'REGISTER FOR RCCG SHIFT SEASON 3 | 2025',
        description: 'Register to be a contestant for the upcoming RCCG shift talent hunt season 3, 2025!',
        url: 'https://rccgshift.org/register',
    },
}


const Contact = async () => {

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Register</span></h1>
                    </div>
                    <div id="page-container">
                        <div className='grid'>
                            <div className='unit two-thirds'>
                                <RegistrationForm />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Contact