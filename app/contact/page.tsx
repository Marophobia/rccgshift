import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import Details from './components/details'


const Contact = async () => {

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>Contact Us</span></h1>
                    </div>
                    <div id="page-container">
                        <Details />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Contact