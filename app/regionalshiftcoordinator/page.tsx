import '../styles/new.css';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import React from 'react';
import PastorsForm from '../forms/components/forms';

type Props = {};

export const metadata = {
    title: "REGIONAL SHIFT COORDINATORS FORM | RCCG SHIFT",
    generator: 'REGIONAL SHIFT COORDINATORS FORM | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'REGIONAL SHIFT COORDINATORS FORM | RCCG SHIFT',
        title: 'REGIONAL SHIFT COORDINATORS FORM | RCCG SHIFT',

    },
    openGraph: {
        title: 'REGIONAL SHIFT COORDINATORS FORM | RCCG SHIFT',
        description: 'Have an enquiry? Do not hesitate to contact us',
        url: 'https://rccgshift.org/regionalshiftcoordinator',
    },
}

const RegionalPastorsForms = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1>
                            <span>Regional Shift Coordinators</span>
                        </h1>
                    </div>
                    <div id="page-container">
                        <PastorsForm />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default RegionalPastorsForms;
