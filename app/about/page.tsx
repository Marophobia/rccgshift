import Navbar from '@/components/navbar';
import React from 'react';
import AboutBody from './components/body';
import '../styles/style.css';

type Props = {};

const About = (props: Props) => {
    return (
        <div>
            <Navbar />
            <div className="jumbotron jumbotron-fluid bg-jumbotron mb-20">
                <div className="container text-center py-5">
                    <div className="d-inline-flex align-items-center text-white">
                        <p className="m-0">
                            <a className="text-white" href="#">
                                Home
                            </a>
                        </p>
                        <i className="far fa-circle px-3"></i>
                        <p className="m-0">
                            About RCCG Int&apos;l Sift Talent Hunt{' '}
                        </p>
                    </div>
                </div>
            </div>

            <AboutBody />
        </div>
    );
};

export default About;
