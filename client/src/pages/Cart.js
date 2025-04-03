import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import FormatPrice from "../formatPrice/FormatPrice";
import ConfirmRemoveModal from "../cartComponents/ConfirmRemoveModal";
import OrderForm from "../cartComponents/PlaceOrderForm";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleRemove = (product) => {
        setSelectedProduct(product);
        setShowRemoveModal(true);
    };

    const confirmRemove = () => {
        removeFromCart(selectedProduct.id);
        setShowRemoveModal(false);
    };

    const handlePlaceOrder = () => {
        setShowOrderForm(true);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = totalPrice * 0.15;
    const finalAmount = totalPrice - discountAmount;

    return (
        <div className="w-11/12 mx-auto p-4 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
                {cart.length > 0 ? (
                    cart.map((product) => (
                        <div key={product.id} className="flex items-start border p-4 rounded-r-md hover:rounded-lg shadow-sm hover:shadow-md">
                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1 ml-4">
                                <h2 className="text-lg font-semibold truncate w-96">{product.name}</h2>
                                <p className="text-gray-600 line-clamp-2">{product.description}</p>

                                <div className="flex items-center mt-2">
                                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg"
                                        onClick={() => updateQuantity(product.id, "decrement")}
                                        disabled={product.quantity <= 1}> - 
                                    </button>
                                    <span className="px-4">{product.quantity}</span>
                                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg"
                                        onClick={() => updateQuantity(product.id, "increment")}> + 
                                    </button>
                                    <button className="ml-4 text-red-500 font-semibold" onClick={() => handleRemove(product)}> Remove </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
            </div>

            {cart.length > 0 && (
                <div className="w-full lg:w-1/3 border p-6 rounded-lg shadow-md h-fit self-start">
                    <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                    <div className="flex justify-between">
                        <span>Actual Price</span>
                        <span className="font-semibold"><FormatPrice price={totalPrice} /></span>
                    </div>
                    <div className="flex justify-between text-green-600 mt-2">
                        <span>Discount</span>
                        <span><FormatPrice price={discountAmount}/> </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-semibold">Total Amount</span>
                        <span className="font-semibold"><FormatPrice price={(finalAmount)} /></span>
                    </div>
                    <button 
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>
            )}

            <ConfirmRemoveModal 
                isOpen={showRemoveModal} 
                onClose={() => setShowRemoveModal(false)} 
                onConfirm={confirmRemove} 
            />

            <OrderForm 
                isOpen={showOrderForm} 
                onClose={() => setShowOrderForm(false)} 
            />
        </div>
    );
};

export default Cart;