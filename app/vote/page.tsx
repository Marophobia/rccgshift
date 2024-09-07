import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'


const Vote = async () => {

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1><span>How to Vote</span></h1>
                    </div>
                    <div id="page-container">
                        <div className='grid'>
                            <div className='unit half'>
                                <ol className='mb-10'>
                                    <li className='pb-5'>Navigate to the Contestant Page of the Website and search for your Contestant using the search bar OR simply input
                                        your contestant unique link on a Web browser
                                    </li>
                                    <li className='pb-5'></li>
                                    <li className='pb-5'>Click on View Profile</li>
                                    <li className='pb-5'>Then, Click on Vote and follow the the instructions</li>
                                </ol>

                                <button className='button'> Contestants Page <i className='fa fa-arrow-right'></i></button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default Vote