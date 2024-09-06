import React from 'react';

type Props = {};

const Sponsor = (props: Props) => {
    return (
        <div className="container-fluid py-5 mb-0">
            <div className="container pt-5">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-6">
                        <h1 className="mb-5">Sponsors/Partnership</h1>
                    </div>
                </div>
                <div className="row">
                    {/* <div className="col-lg-3 col-md-6">
                        <div className="team position-relative overflow-hidden mb-5">
                            <img
                                className="img-fluid"
                                src="/img/team-1.jpg"
                                alt=""
                            />
                            <div className="position-relative text-center">
                                <div className="team-text bg-primary text-white">
                                    <h5 className="text-white text-uppercase">
                                        Sponsor
                                    </h5>
                                </div>
                                <div className="team-social bg-dark text-center">
                                    <h5 className="text-white text-uppercase">
                                        Premium Trust bank
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-lg-4 col-md-4">
                        <div className="team position-relative overflow-hidden mb-5">
                            <img
                                className="img-fluid"
                                src="/img/team-2.jpg"
                                alt=""
                            />
                            <div className="position-relative text-center">
                                <div className="team-text bg-primary text-white">
                                    <h5 className="text-white text-uppercase">
                                        Sponsor
                                    </h5>
                                </div>
                                <div className="team-social bg-dark text-center">
                                    <h5 className="text-white text-uppercase">
                                        Onc foundation UK
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="team position-relative overflow-hidden mb-5">
                            <img
                                className="img-fluid"
                                src="/img/team-3.jpg"
                                alt=""
                            />
                            <div className="position-relative text-center">
                                <div className="team-text bg-primary text-white">
                                    <h5 className="text-white text-uppercase">
                                        Sponsor
                                    </h5>
                                </div>
                                <div className="team-social bg-dark text-center">
                                    <h5 className="text-white text-uppercase">
                                        Qozeh Nig Ltd
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="team position-relative overflow-hidden mb-5">
                            <img
                                className="img-fluid"
                                src="/img/team-4.jpg"
                                alt=""
                            />
                            <div className="position-relative text-center">
                                <div className="team-text bg-primary text-white">
                                    <h5 className="text-white text-uppercase">
                                        Sponsor
                                    </h5>
                                </div>
                                <div className="team-social bg-dark text-center">
                                    <h5 className="text-white text-uppercase">
                                        Rccgnyaya
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sponsor;
