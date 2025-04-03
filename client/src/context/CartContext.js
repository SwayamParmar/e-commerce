import React, { createContext, useState, useEffect } from "react";
// Create Context
export const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    // Load cart from localStorage or default to an empty array
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, type) => {
        setCart(cart.map(item => 
            item.id === productId 
                ? { ...item, quantity: type === "increment" ? item.quantity + 1 : Math.max(1, item.quantity - 1) } 
                : item
        ));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, setCart }}>
            {children}
        </CartContext.Provider>
    );
};
