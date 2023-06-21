import React from 'react';
import '../theme/course_visualizer.css'

export const Navbar = () => {
    return (
        <>
            <nav class="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand">UMass Course Visualizer</a>
                    <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </>
    );
};