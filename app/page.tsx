import React from 'react'
import './styles/new.css'
import Header from './components/header'
import COntestants from './components/contestants'
import Sponsor from './components/sponsors'
import Footer from './components/footer'
import About from './components/about'
import Reward from './components/reward'
import Outline from './components/outline'
import Slider from './components/carousel2'

type Props = {}

const Page = (props: Props) => {
    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    {/* <CarouselHero /> */}
                    <Slider />
                    <div id="page-container">
                        <About />
                        <COntestants />
                        <Outline />
                        <Reward />
                        <div className="grid-border"></div>
                        <Sponsor />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Page