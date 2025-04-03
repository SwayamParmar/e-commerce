import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from 'react-toastify';
import { Slide } from 'react-toastify';


const PlaceOrderForm = ({ isOpen, onClose }) => {
    const { cart, setCart } = useContext(CartContext); // Get cart data from context

    const showToast = (message, type = 'error') => {
        toast[type](message, {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: type === 'error' ? 'colored' : 'dark',
            transition: Slide,
        });
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.firstName) {
            showToast("First Name is required", 'error');
            return;
        } else if (!formData.lastName) {
            showToast("Last Name is required" , 'error');
            return;
        } else if (!formData.address) {
            showToast("Address is required" , 'error');
            return;
        }

        const orderData = {
            ...formData,
            cartItems: cart, // Send cart items to backend
        };

        try {
            const response = await fetch("http://localhost:3001/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (response.ok) {
                showToast("Order placed successfully!", 'success');
                setCart([]);
                onClose();
            } else {
                showToast(data.error || 'Login failed, please try again', 'error');
            }
        } catch (error) {
            showToast("Failed to connect to server", 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <div className="flex justify-end space-x-4 mt-4">
                        <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlaceOrderForm;
