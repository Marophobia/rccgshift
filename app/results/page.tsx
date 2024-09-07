import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import Rounds from './components/rounds'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'


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

const Results = async () => {
    const data = await getData()
    const { rounds, settings } = await getData()

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Competition Results</span></h1>
                    </div>
                    <div id="page-container">
                        <Rounds rounds={rounds.data} settings={settings.data} />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Results