import '../styles/new.css';
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { headers } from 'next/headers';
type Props = {};    
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import CoordinatorsList from './components/coordinators';
export const metadata = {
    title: "OUR COORDINATORS | RCCG SHIFT",
    generator: 'OUR COORDINATORS | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'OUR COORDINATORS | RCCG SHIFT',
        title: 'OUR COORDINATORS | RCCG SHIFT',

    },
    openGraph: {
        title: 'OUR COORDINATORS | RCCG SHIFT',
        description: 'Meet our Coordinators for season 2 of the Shift Intl talent',
        url: 'https://rccgshift.org/coordinators',
    },
}

const getCoordinators = async () => {
    const authorization = headers().get('authorization')
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/coordinators`,
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


const Coordinators = async (props: Props) => {
    const coordinators = await getCoordinators();
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Shift Coordinators</span></h1>
                    </div>
                    <div id="page-container">
                        <CoordinatorsList coordinators={coordinators.data} />           
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Coordinators;
