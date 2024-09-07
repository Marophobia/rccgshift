import '../../styles/new.css'
import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Link from 'next/link'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'
import Participants from '../components/single'


const RoundSingle = async ({ params }: { params: { id: number } }) => {

    const id = params.id
    let round
    let settings

    try {
        const authorization = headers().get('authorization')
        const headersInit: HeadersInit = authorization ? { authorization } : {};
        const response = await fetch(`${apiUrl}/api/admin/rounds/single`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            cache: 'no-store',
            headers: headersInit
        });
        const responseData = await response.json();
        const response2 = await fetch(`${apiUrl}/api/admin/settings`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            cache: 'no-store',
            headers: headersInit
        });
        const responseData2 = await response2.json();
        round = responseData.data
        settings = responseData2.data

    } catch (error) {
        console.error('Error:', error);
    }

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>{round.name}</span></h1>
                    </div>
                    <div id="page-container">
                        <Participants qualifiers={round.qualifiers} participants={round.users} />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default RoundSingle