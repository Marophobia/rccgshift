import CarouselHero from '@/components/carousel';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import About from '@/components/about';
import HomeCarousel from '@/components/homeCarousel';
import './styles/style.css';
import HomeEvent from '@/components/event';
import Reward from '@/components/reward';
import Sponsor from '@/components/sponsor';

export default function Home() {
    return (
        <>
            <div className="snap-y snap-mandatory">
                <Navbar />

                <CarouselHero />

                <About />

                <HomeCarousel />

                <HomeEvent />

                <Reward />

                <Sponsor />

                {/* start footer */}

                <a href="#" className="btn btn-lg btn-primary back-to-top">
                    <i className="fa fa-angle-double-up"></i>
                </a>
            </div>
        </>
    );
}
