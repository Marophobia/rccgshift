import '../../styles/new.css'
import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import CoordintorsForm from './components/form'
import { headers } from 'next/headers'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const metadata = {
    title: "COORDINATORS REGISTRATION FOR RCCG SHIFT SEASON 3 | 2025",
    generator: 'COORDINATORS REGISTRATION FOR RCCG SHIFT SEASON 3 | 2025',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'COORDINATORS REGISTRATION FOR RCCG SHIFT SEASON 3 | 2025',
        title: 'COORDINATORS REGISTRATION FOR RCCG SHIFT SEASON 3 | 2025',

    },
    openGraph: {
        title: 'COORDINATORS REGISTRATION FOR RCCG SHIFT SEASON 3 | 2025',
        description: 'Register to be a coordinator for the upcoming RCCG shift talent hunt season 3, 2025!',
        url: 'https://rccgshift.org/register/coordinators',
    },
}

const getDepartments = async () => {
    const authorization = headers().get('authorization')
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/departments`,
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


const Contact = async () => {
    const departments = await getDepartments();
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Executives / Coordinators Registration</span></h1>
                    </div>
                    <div id="page-container">
                        <div className='grid'>
                            <div className='unit two-thirds'>
                                <CoordintorsForm departments={departments.data} />
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