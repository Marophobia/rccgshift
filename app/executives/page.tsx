import '../styles/new.css';
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Team from './components/team';

type Props = {};

const Exec = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Our Leaders</span></h1>
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
