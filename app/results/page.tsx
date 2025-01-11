import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import Rounds from './components/rounds'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'

export const metadata = {
    title: "RESULTS | RCCG SHIFT",
    generator: 'RESULTS | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'RESULTS | RCCG SHIFT',
        title: 'RESULTS | RCCG SHIFT',

    },
    openGraph: {
        title: 'RESULTS | RCCG SHIFT',
        description: 'Results of Concluded Auditions in RCCG Shift Talent Hunt Season 2',
        url: 'https://rccgshift.org/results',
    },
}


const getData = async () => {

    const authorization = headers().get('authorization')
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/admin/rounds`,
        {
            method: 'POST',
            cache: 'no-store',
        })
    const res2 = await fetch(`${apiUrl}/api/admin/settings`,
        {
            method: 'POST',
            cache: 'no-store',
            headers: headersInit
        })
    if (!res.ok || !res2.ok) {
        throw new Error('Failed to fetch data')
    }

    return { rounds: await res.json(), settings: await res2.json() }
}

const getSeasons = async () => {
    const authorization = headers().get('authorization')
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/seasons`,
        {
            method: 'POST',
            cache: 'no-store',
            headers: headersInit
        })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

const Results = async () => {
    const data = await getData()
    const { rounds, settings } = await getData()
    const seasons = await getSeasons()


    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Competition Results</span></h1>
                    </div>
                    <div id="page-container">
                        <Rounds rounds={rounds.data} settings={settings.data} season={seasons.data} />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Results