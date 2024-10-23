import '../styles/new.css';
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Team from './components/team';

type Props = {};

export const metadata = {
    title: 'OUR LEADERS | RCCG SHIFT',
    generator: 'OUR LEADERS | RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    twitter: {
        card: 'OUR LEADERS | RCCG SHIFT',
        title: 'OUR LEADERS | RCCG SHIFT',
    },
    openGraph: {
        title: 'OUR LEADERS | RCCG SHIFT',
        description:
            'Meet our Leaders from our General Overseer to our judges through our Director',
        url: 'https://rccgshift.org/executives',
    },
};

const Exec = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1>
                            <span>Our Leaders</span>
                        </h1>
                    </div>
                    <div id="page-container">
                        <Team />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Exec;
