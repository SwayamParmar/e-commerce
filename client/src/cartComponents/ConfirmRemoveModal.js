import React from "react";

const ConfirmRemoveModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Are you sure you want to remove this item?</h2>
                <div className="flex justify-between space-x-4">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded w-full"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded w-full"
                        onClick={onConfirm}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRemoveModal;
