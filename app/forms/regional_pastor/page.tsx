import '../../styles/new.css';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import React from 'react';
import PastorsForm from '../components/forms';

type Props = {};

const RegionalPastorsForms = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1>
                            <span>Regional Pastors Form</span>
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
