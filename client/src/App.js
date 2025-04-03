import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";

function AppContent() {
    const location = useLocation(); // Now it's inside Router context

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            {location.pathname !== '/cart' && <Footer />}
        </>
    );
}

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
