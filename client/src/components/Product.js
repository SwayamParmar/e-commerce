import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import FormatPrice from '../formatPrice/FormatPrice';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    
    useEffect(() => {
        fetch("http://localhost:3001/products") // Fetch from your backend
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load products.");
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="w-11/12 mx-auto container p-4">
                <h1 className="text-3xl font-bold text-center my-6">Products</h1>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4 shadow-lg flex flex-col h-full">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                            <h2 className="text-lg font-semibold mt-2 line-clamp-2">
                                {product.name.length > 50 ? product.name.substring(0, 50) + "..." : product.name}
                            </h2>
                            <p className="text-gray-600 text-sm line-clamp-4">
                                {product.description.length > 120 ? product.description.substring(0, 120) + "..." : product.description}
                            </p>
                            <div className="flex gap-cols-4 justify-between mt-4 align-center">
                                <span className="text-blue-600 font-bold mt-2">
                                    <FormatPrice price={product.price} />
                                </span>
                                <button onClick={() => addToCart(product)} className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Product;
