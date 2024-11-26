import '../../styles/new.css';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import React from 'react';
import ProvinceForm from '../components/provinceform';

type Props = {};

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
