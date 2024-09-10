import '../styles/new.css';
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import AboutBody from './components/body';

type Props = {};

const About = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    {/* <div id="featured-image-container">
                        <div
                            id="featured-image"
                            style={{
                                backgroundImage: `url(/images/logo-white.png)`,
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <div id="featured-image-title">
                                <h1>About Us</h1>
                            </div>
                        </div>
                    </div> */}
                    <div id="page-title">
                        <h1><span>About Us</span></h1>
                    </div>
                    <div id="page-container">
                        <AboutBody />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default About;
