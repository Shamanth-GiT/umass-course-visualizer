import React from 'react';
import '../theme/course_visualizer.css'

export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">CICSNavigator</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/discovery">Discovery</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/schedule">Course List</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/coursegraph">Course Graph</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};