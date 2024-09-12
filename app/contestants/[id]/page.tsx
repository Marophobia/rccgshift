import '../../styles/new.css'
import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Link from 'next/link'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'
import Single from '../components/single'

export async function generateMetadata({ params }: { params: { id: number } }) {
    // read route params
    const id = params.id

    const data = await fetch(`${apiUrl}/api/contestant/single`, { method: 'POST', body: JSON.stringify({ id }) }).then((res) => res.json())
    const contestant = data.data.contestant

    return {
        title: `Vote for ${contestant.name}`,
        generator: 'RCCG SHIFT',
        applicationName: 'RCCG SHIFT',
        referrer: 'origin-when-cross-origin',
        authors: [{ name: 'RCCG SHIFT' }],
        creator: 'RCCG SHIFT',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },

        metadataBase: new URL('https://rccgshift.org/images/contestants/'),

        twitter: {
            card: `Vote for ${contestant.name}`,
            title: `Vote for ${contestant.name}`,
            description: `Vote for and View Contestant Profile - ${contestant.name}.`,
            creator: 'RCCG SHIFT',
            images: contestant.picture,
        },
        openGraph: {
            title: contestant.title,
            description: `Vote for and View Contestant Profile - ${contestant.name}.`,
            url: `https://rccgshift.org/contestants/${contestant.id}`,
            siteName: 'RCCG SHIFT',
            images: [
                {
                    url: `https://rccgshift.org/images/contestants/${contestant.picture}`,
                    width: 800,
                    height: 600,
                },
            ],
        },
    }
}


const ContestantSingle = async ({ params }: { params: { id: number } }) => {

    const id = params.id
    let data
    try {
        const authorization = headers().get('authorization')
        const headersInit: HeadersInit = authorization ? { authorization } : {};
        const response = await fetch(`${apiUrl}/api/contestant/single`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            cache: 'no-store',
            headers: headersInit
        });
        const responseData = await response.json();
        data = responseData.data

    } catch (error) {
        console.error('Error:', error);
    }
    const { contestant, settings } = data
    // console.log(contestant)

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>{contestant.name}</span></h1>
                    </div>
                    <div id="page-container">
                        <Single contestant={contestant} settings={settings} />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default ContestantSingle