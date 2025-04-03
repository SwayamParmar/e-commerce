import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [isLoaded, setIsLoaded] = useState(false);  // Add a loading state

    useEffect(() => {
        setIsLoaded(true); // Set loading complete after component is mounted
    }, []);

    if (!isLoaded) {
        return null; // Avoid rendering anything until loaded
    }

    const WebHeader = () => {
        return (
            <div className="text-center relative">
                <header className="relative top-0 left-0 w-full z-1 bg-white dark:bg-gray-900 flex items-center justify-between p-2 transition-colors duration-300">
                    <div className="w-11/12 mx-auto flex items-center justify-between transition-colors duration-300">
                        <div className="flex items-center space-x-4 transition-colors duration-300">
                            <NavLink to="/" className="no-underline">
                                <span className="text-xl text-slate-700 dark:text-white font-bold">Knovator E-commerce</span>
                            </NavLink>
                        </div>
                        <nav className="flex items-center space-x-4 transition-colors duration-300">
                            <NavLink to="/cart" className="no-underline">
                                <button className="text-base text-slate-700 dark:text-white font-medium px-4 py-2 bg-[#f4f5f9] hover:text-slate-800 transition-colors duration-300 border-0 rounded-2xl">
                                    Cart
                                </button>
                            </NavLink>
                        </nav>
                    </div>
                </header>
            </div>
        );
    };

    return (
        <>
            {<WebHeader />}
        </>
    );
};

export default Header;
