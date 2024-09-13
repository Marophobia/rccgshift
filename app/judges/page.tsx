import '../styles/new.css';
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import JudgesList from './components/judges';

type Props = {};

export const metadata = {
    title: "OUR JUDGES | RCCG SHIFT",
    generator: 'OUR JUDGES | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'OUR JUDGES | RCCG SHIFT',
        title: 'OUR JUDGES | RCCG SHIFT',

    },
    openGraph: {
        title: 'OUR JUDGES | RCCG SHIFT',
        description: 'Meet our Judges for season 2 of the Shift Intl talent',
        url: 'https://rccgshift.org/judges',
    },
}

const S2Judges = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Judges - Season 2</span></h1>
                    </div>
                    <div id="page-container">
                        <JudgesList />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default S2Judges;
