"use client"
import { useState } from "react";
import UserButton from "./UserButton";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="px-4 py-4 md:px-8 container mx-auto flex justify-between items-center relative">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img src="/itsmelogo.png" alt="" width={45} />
                <h2 className="font-bold text-2xl">ITS.ME</h2>
            </div>

            {/* Desktop menu */}
            <ul className="hidden md:flex gap-8 items-center">
                <a href="/" className="font-medium cursor-pointer hover:text-blue-600 transition-all duration-200">Homepage</a>
                <a href="/#features" className="font-medium cursor-pointer hover:text-blue-600 transition-all duration-200">Features</a>
                <UserButton />
            </ul>

            {/* Mobile Hamburger */}
            <button
                className="md:hidden text-2xl cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Mobile menu */}
            <div className={`fixed top-[72px] left-0 w-screen bg-white shadow-md md:hidden transition-all duration-300 ${menuOpen ? 'max-h-screen py-4' : 'overflow-hidden max-h-0'}`}>                <ul className="flex flex-col gap-4 items-center">
                <a href="/" className="font-medium cursor-pointer hover:text-blue-600 transition-all duration-200" onClick={() => setMenuOpen(false)}>Homepage</a>
                <a href="/#features" className="font-medium cursor-pointer hover:text-blue-600 transition-all duration-200" onClick={() => setMenuOpen(false)}>Features</a>
                <UserButton />
            </ul>
            </div>
        </nav>
    )
}
