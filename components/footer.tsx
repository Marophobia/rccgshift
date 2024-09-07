"use client"
import React from "react"

type Props = {}

const Foot = (props: Props) => {
    return (
        <>
            <div className="footer container-fluid position-relative bg-dark py-5">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-lg-6 pr-lg-5 mb-5">
                            <a href="index-2.html" className="navbar-brand">
                                <h1 className="mb-3 text-white">
                                    <span className="text-primary">Get</span> In-Touch
                                </h1>
                            </a>
                            <p>
                                Exposure: The RCCG SHIFT Talent Hunt is a great opportunity to showcase your talents to a wide audience.
                                The competition is televised and streamed live online, so you have the chance to be seen by millions of people
                                around the world.
                                <br />
                                <br />
                                Personal growth: Participating in the RCCG SHIFT Talent Hunt can help you to grow as a person. It can help you
                                to build your confidence, develop your skills, and overcome your fears.
                            </p>
                            <div className="d-flex justify-content-start mt-5">
                                <a className="btn btn-lg btn-primary btn-lg-square mr-2" href="#">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-lg btn-primary btn-lg-square" href="#">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 pl-lg-5">
                            <div className="row">
                                <div className="col-sm-6 mb-5">
                                    <h5 className="text-white text-uppercase mb-4 text-primary">Quick Links</h5>
                                    <div className="d-flex flex-column justify-content-start">
                                        <a className="text-white-50 mb-2" href="index-2.html">
                                            <i className="fa fa-angle-right mr-2"></i>Home
                                        </a>
                                        <a className="text-white-50 mb-2" href="aboutshift.html">
                                            <i className="fa fa-angle-right mr-2"></i>About Shift
                                        </a>
                                        <a className="text-white-50 mb-2" href="how_to_vote.html">
                                            <i className="fa fa-angle-right mr-2"></i>How To Vote
                                        </a>
                                        <a className="text-white-50 mb-2" href="contestants.html">
                                            <i className="fa fa-angle-right mr-2"></i>Contestants
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-5">
                                    <h5 className="text-white text-uppercase mb-4 text-primary">Need Help?</h5>
                                    <div className="d-flex flex-column justify-content-start">
                                        <p>
                                            <i className="fa fa-map-marker-alt mr-2"></i>Redemption City of God
                                        </p>
                                        <p>
                                            <i className="fa fa-phone-alt mr-2"></i>+447424483987
                                        </p>
                                        <p>
                                            <i className="fa fa-phone-alt mr-2"></i>+2347060626135
                                        </p>
                                        <p>
                                            <i className="fa fa-phone-alt mr-2"></i>+2348058834954
                                        </p>
                                        <p>
                                            <i className="fa fa-envelope mr-2"></i>info@rccgshift.org
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-5">
                                    <h5 className="text-white text-uppercase mb-4 text-primary">Newsletter</h5>
                                    <div className="w-100">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control border-light"
                                                style={{ padding: '30px' }}
                                                placeholder="Your Email Address"
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary px-4">Sign Up</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="container-fluid bg-dark text-light border-top py-4"
                style={{ borderColor: 'rgba(256, 256, 256, .15)' }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                            <p className="m-0 text-white">
                                &copy; 2024. <a href="#">RCCG SHIFT</a>. All Rights Reserved.
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-right">
                            <p className="m-0 text-white">
                                Powered by <a href="#" target="_blank" rel="noopener noreferrer">RCCG SHIFT ICT</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Foot