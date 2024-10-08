import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'

export const metadata = {
    title: "HOW TO VOTE | RCCG SHIFT",
    generator: 'HOW TO VOTE | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'HOW TO VOTE | RCCG SHIFT',
        title: 'HOW TO VOTE | RCCG SHIFT',

    },
    openGraph: {
        title: 'HOW TO VOTE | RCCG SHIFT',
        description: 'How to Vote for your contestant | RCCG Shift',
        url: 'https://rccgshift.org/vote',
    },
}


const Vote = async () => {

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>How to Vote</span></h1>
                    </div>
                    <div id="page-container">
                        <div className='grid'>
                            <div className='unit half'>
                                <ol className='mb-10'>
                                    <li className='pb-5'>1. Navigate to the Contestant Page of the Website and search for your Contestant using the search bar OR simply input
                                        your contestant unique link on a Web browser
                                    </li>
                                    <li className='pb-5'>2. Click on View Profile</li>
                                    <li className='pb-5'>3. Then, Click on Vote and follow the the instructions</li>
                                </ol>

                                <Link href="/contestants" className='button'>Go to Contestants Page <i className='fa fa-arrow-right'></i></Link>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Vote