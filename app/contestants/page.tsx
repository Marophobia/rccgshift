import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import Card from './components/card'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'


const getContestants = async () => {
    const authorization = headers().get('authorization')
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/admin/contestants`,
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


const Contestants = async () => {

    const contestants = await getContestants()


    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Contestants</span></h1>
                    </div>
                    <div id="page-container">
                        <Card data={contestants.data} />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Contestants