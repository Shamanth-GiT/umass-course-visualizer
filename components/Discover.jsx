import React from 'react';
import '@styles/discovery.css';

export const Discovery = () => {
    return (
        <div className="discovery">
            <div id="header-disc"><h1>Welcome User!</h1></div>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Course List</h5>
                        <p className="card-text">View information regarding any CICS course and add it to your schedule</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Profile</h5>
                        <p className="card-text">Personalize your own profile and edit your plan</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Course Graph</h5>
                        <p className="card-text">View all of CICS&apos;s current offering with an interactive graph</p>
                    </div>
                </div>
            </div>
            <div id="logo"></div>
        </div>
    );
}