"use client"

import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const SearchBar = ({ searchInput, setSearchInput }) => (
    <div className="flex bg-white rounded items-center p-1.5 w-72">
        <FaSearch />
        <input
            className="outline-none px-2 py-1 w-full"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        />
    </div>
)

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const handleToggle = () => {
        setOpen(!open);
    };

    const menuItems = [
        { label: 'Discovery', href: "/discovery"},
        { label: 'Profile', href: "/profile"},
        { label: 'Course List', href: "/list" },
        { label: 'Course Graph', href: "/dashboard" },
    ];

    return (
        <nav className="bg-maroon p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-6">
                    <button onClick={handleToggle} className="text-white md:hidden">
                        <FaBars />
                    </button>
                    <a href="/discovery" className="text-2xl text-white font-bold no-underline">
                        CICS Course Visualizer
                    </a>
                    <div className="hidden md:block">
                        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
                    </div>
                </div>
                <div className="hidden md:flex">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="text-white text-lg px-4 py-2 rounded hover:text-gray-200"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
            {open && (
                <div className="mt-4 space-y-2 md:hidden">
                    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className="block text-white text-lg px-4 py-2 rounded hover:text-gray-200"
                            onClick={handleToggle}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;