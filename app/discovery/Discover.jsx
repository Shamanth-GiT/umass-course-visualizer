import React from 'react';
import '@styles/globals.css'

export const Discovery = () => {
    return (
        <div className="text-center relative min-h-screen p-4 bg-white flex flex-col items-center justify-between">
            <div id="header-disc" className="font-bold text-4xl pt-8"><h1>Welcome User!</h1></div>
            <div className="container mx-auto mt-10 flex flex-wrap justify-center">
                <a href={"/list"}>
                    <div className="card w-96 m-4 border-2 border-black border-dashed font-sans h-48 flex flex-col justify-center items-center hover:border-solid hover:border-red-700 transition duration-500">
                        <div className="card-body">
                            <h5 className="card-title font-semibold text-xl">Course List</h5>
                            <p className="card-text">View information regarding any CICS course and add it to your schedule</p>
                        </div>
                    </div>
                </a>
                <a href={"/profile"}>
                    <div className="card w-96 m-4 border-2 border-black border-dashed font-sans h-48 flex flex-col justify-center items-center hover:border-solid hover:border-red-700 transition duration-500">
                        <div className="card-body">
                            <h5 className="card-title font-semibold text-xl">Profile</h5>
                            <p className="card-text">Personalize your own profile and edit your plan</p>
                        </div>
                    </div>
                </a>
                <a href={"/dashboard"}>
                    <div className="card w-96 m-4 border-2 border-black border-dashed font-sans h-48 flex flex-col justify-center items-center hover:border-solid hover:border-red-700 transition duration-500">
                        <div className="card-body">
                            <h5 className="card-title font-semibold text-xl">Course Graph</h5>
                            <p className="card-text">View all of CICS&apos;s current offering with an interactive graph</p>
                        </div>
                    </div>
                </a>
            </div>
            <div id="logo" className="h-72 w-1/2 mt-16 mb-16 px-8" style={{ backgroundImage: "url('/images/Manning_CICS-horiz-cmyk.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
        </div>
    );
}