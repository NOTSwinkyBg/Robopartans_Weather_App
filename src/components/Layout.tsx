import React from "react";
import { NavLink, Outlet } from "react-router-dom";
export type PageType = 'home' | 'games';
// import EasterEgg from "./EasterEgg";

const Layout: React.FC= () => {

    const getLinkClass = ({isActive}: {isActive: boolean}) => 
        `px-4 py-2 rounded-lg transition-all duration-200 font medium ${isActive 
            ? 'bg-blue-600 text-white shadow-blue-500/50 shadow-md' 
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`;

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans">
            {/* Header */}
            {/* <EasterEgg/> */}
            <header className="bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    {/* LOGO */}
                    <NavLink className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
                        to="/">
                        <span className="text-3xl">🌦️</span>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            MyWeatherApp
                        </h1>
                    </NavLink>

                    {/* NAVIGATION */}
                    <nav className="flex space-x-2">
                        <NavLink
                            to="/"
                            className={getLinkClass}
                        >Времето</NavLink>

                        <NavLink to="/games"
                            className={getLinkClass}
                        >Развлечение</NavLink>

                        <NavLink to="/about"
                            className={getLinkClass}
                        >За Нас</NavLink>
                    </nav>
                </div>
            </header>
                                
            {/* Main Body */}
            <main className="grow w-full max-w-6xl mx-auto p-4 md:p-6 animate-fade-in">
                <Outlet />
            </main>

            <footer className="bg-gray-950 border-t border-gray-800 py-8 mt-auto">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gray-500 mb-2">
                        &copy; 2025 Swinky Web Dev Ltd.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;


