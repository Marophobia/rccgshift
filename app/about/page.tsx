import '../styles/new.css'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import AboutBody from './components/body'

type Props = {}

const About = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="featured-image-container">
                        {/* <div className="img-loading"></div> */}
                        <div id="featured-image">
                            <div id="featured-image-title">
                                <h1>About Us</h1>
                                <p><span>Quid o quibusdam te enim ita sea qui</span></p>
                            </div>
                        </div>
                    </div>
                    <div id="page-container">
                        <AboutBody />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    )
}

export default About