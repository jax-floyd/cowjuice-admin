import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useMasterContext } from '../contexts/MasterContext';

const parsePrice = (amountInCents) => {
    if (typeof amountInCents !== 'number') return '';
    return (amountInCents / 100).toFixed(2);
};

const Bag = () => {
    const navigate = useNavigate();
    const { user, bag, setBag } = useMasterContext();

    const subtotal = bag.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="inset-0 flex flex-1 max-w-3xl mx-auto px-6 pb-6 w-full h-full overflow-hidden">
            <div className="flex flex-col items-center justify-start space-y-6 w-full animate-fade">

                <div className="flex flex-col w-full items-center justify-center space-y-4">
                    {/* Bag  */}
                    <p className="font-mono flex w-full text-left text-xs uppercase font-bold animate-flip-down">You currently have __ # of cans of Cow Juice in your cart.</p>

                    {/* Bag Items */}
                    <div className="flex flex-col w-full items-center justify-center space-y-2">
                        {bag.length === 0 ? (
                            <p className="w-full text-xs text-left font-mono">Your bag is empty. 🥲</p>
                        ) : (
                            bag.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex w-full justify-between items-center border-[0.5px] border-black dark:border-white rounded-sm p-2 animate-flip-down"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-mono text-xs uppercase">{item.name}</span>
                                        <span className="font-mono text-[10px] opacity-70">${parsePrice(item.price)} per case</span>
                                    </div>

                                    <div className="flex flex-col items-end space-y-1">
                                        <span className="font-mono text-xs">{item.quantity} ×</span>
                                        <span className="font-mono text-xs font-bold">${parsePrice(item.price * item.quantity)}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Divider */}
                    <div className="w-full border-b-[0.25px] border-black dark:border-white" />

                    {/* Subtotal */}
                    {bag.length > 0 && (
                        <div className="flex flex-col w-full space-y-2">
                            <div className="flex justify-between w-full font-mono text-xs">
                                <span>Subtotal</span>
                                <span className="font-bold">${parsePrice(subtotal)}</span>
                            </div>

                            <p className="font-mono text-[10px] opacity-60 pt-1">
                                Shipping & taxes calculated at next step.
                            </p>

                            <button
                                onClick={() => navigate(`/checkout`)} // Adjust this if you have a real Checkout page
                                className="text-xs font-mono w-full font-bold uppercase text-left p-2 border-[0.5px] rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Bag;