import React from 'react';
import '@styles/discovery.css';

export const Discovery = () => {
    return (
        <div class="discovery">
            <div id="header-disc"><h1>Welcome User!</h1></div>
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Course List</h5>
                        <p class="card-text">View information regarding any CICS course and add it to your schedule</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Profile</h5>
                        <p class="card-text">Personalize your own profile and edit your plan</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Course Graph</h5>
                        <p class="card-text">View all of CICS's current offering with an interactive graph</p>
                    </div>
                </div>
            </div>
            <div id="logo"></div>
        </div>
    );
}