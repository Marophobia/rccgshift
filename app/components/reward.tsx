'use client';
import React from 'react';

type Props = {};

const Reward = (props: Props) => {

    return (
        <>
            <div className="grid">
                <div className="unit one-third">
                    <div className="icon-container">
                        <a href="models-2-columns.html" className="fa fa-trophy"></a>
                    </div>
                    <div className="icon-text">
                        <h3>Winner <br />  ₦10 Million</h3>
                        <p>Cash & Deals, A new Car, 3 Nights Holiday Getaway, Promotional Deals, Endorsements, Branding</p>
                    </div>
                </div>
                <div className="unit one-third">
                    <div className="icon-container">
                        <a href="models-2-columns.html" className="fa fa-medal"></a>
                    </div>
                    <div className="icon-text">
                        <h3>First Runner Up <br /> ₦1 Million</h3>
                        <p>One Million Naira Cash Prize</p>
                    </div>
                </div>
                <div className="unit one-third">
                    <div className="icon-container">
                        <a href="models-2-columns.html" className="fa fa-medal"></a>
                    </div>
                    <div className="icon-text">
                        <h3>Second Runner Up <br />  ₦500K</h3>
                        <p>500 Thousand Naira Cash Prize</p>
                    </div>
                </div>
            </div>
        </>

    );
};



export default Reward;
