'use client';
import React from 'react';

type Props = {};

const Reward = (props: Props) => {

    return (
        <>
            <div className="grid">
                <div className="unit one-third">
                    <div className="icon-container">
                        <a className="fa fa-trophy"></a>
                    </div>
                    <div className="icon-text">
                        <h3>Winner <br />  ₦10 Million</h3>
                        <p>Cash & Deals, An SUV, Promotional Deals, Endorsements, Branding</p>
                    </div>
                </div>
                <div className="unit one-third">
                    <div className="icon-container">
                        <a className="fa fa-medal"></a>
                    </div>
                    <div className="icon-text">
                        <h3>First Runner Up <br /> ₦2 Million</h3>
                        <p>Two Million Naira Cash Prize</p>
                    </div>
                </div>
                <div className="unit one-third">
                    <div className="icon-container">
                        <a className="fa fa-medal"></a>
                    </div>
                    <div className="icon-text">
                        <h3>Second Runner Up <br />  ₦1 Million</h3>
                        <p>One Million Naira Cash Prize</p>
                    </div>
                </div>
            </div>
        </>

    );
};



export default Reward;
