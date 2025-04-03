import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from "../context/CartContext";

const Header = () => {
    const [isLoaded, setIsLoaded] = useState(false);  // Add a loading state
    const { cart } = useContext(CartContext);

    useEffect(() => {
        setIsLoaded(true); // Set loading complete after component is mounted
    }, []);

    if (!isLoaded) {
        return null; // Avoid rendering anything until loaded
    }

    // Calculate total items in the cart
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
                            <NavLink to="/cart" className="no-underline relative">
                                <button className="text-base text-slate-700 dark:text-white font-medium px-4 py-2 bg-[#f4f5f9] hover:text-slate-800 transition-colors duration-300 border-0 rounded-2xl relative">
                                    Cart
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
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
