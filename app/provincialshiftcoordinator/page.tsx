import '../styles/new.css';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import React from 'react';
import ProvinceForm from '../forms/components/provinceform';

type Props = {};

export const metadata = {
    title: "PROVINCIAL SHIFT COORDINATORS FORM | RCCG SHIFT",
    generator: 'PROVINCIAL SHIFT COORDINATORS FORM | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'PROVINCIAL SHIFT COORDINATORS FORM | RCCG SHIFT',
        title: 'PROVINCIAL SHIFT COORDINATORS FORM | RCCG SHIFT',
    },
    
    openGraph: {
        title: 'PROVINCIAL SHIFT COORDINATORS FORM | RCCG SHIFT',
        description: 'Have an enquiry? Do not hesitate to contact us',
        url: 'https://rccgshift.org/provincialshiftcoordinator',
    },
}

const ProvincialPastorsForms = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1>
                            <span>Provincial Shift Coordinators</span>
                        </h1>
                    </div>
                    <div id="page-container">
                  <ProvinceForm />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default ProvincialPastorsForms;
