
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useMasterContext } from '../../contexts/MasterContext';

import triggerPostToListProducts from '../../functions/shopify/triggerPostToListProducts';

import rack_1 from '../../assets/rack_1.png';

const Products = () => {

    const navigate = useNavigate();
    
    const { user, bag, setBag } = useMasterContext();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [checkoutError, setCheckoutError] = useState('');
    const [activeCounters, setActiveCounters] = useState({}); // <- NEW! Track which products have a counter

    const fetchProducts = async () => {
        setLoading(true);           // good UX if you let users refresh later
        setError('');
    
        try {
            // your helper should return { products: [...] }
            const products = await triggerPostToListProducts();
            console.log('Products:', products.products);
            setProducts(products.products);

        } catch (err) {
            console.error('Failed to fetch products:', err);
            setError('Could not load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchProducts();
        }, 500);
    }, []);

    const parsePrice = (amountInCents) => {
        if (typeof amountInCents !== 'number') return '';
        return (amountInCents / 100).toFixed(2);
    };

    const handleBuyNow = async ( product ) => {
        setLoading(true);

        const numericId = product.id;
        const uniqueSuffix = uuidv4().replace(/-/g, '');
        const cleanCheckoutId = `${numericId}-${uniqueSuffix}`;
        
        navigate(`/checkouts/${cleanCheckoutId}/contact-entry/impatient`, { state: { product: product } });
    };

    const handleViewProduct = ( product ) => {
        setLoading(true);
        
        navigate(`/shopify/products/${product.id}`, { state: { product: product } });
    }; 

    const handleAddToBag = ( product ) => {
        // Add product with quantity 1
        const updatedBag = [...bag];
        const foundIndex = updatedBag.findIndex(item => item.id === product.id);
    
        if (foundIndex === -1) {
            updatedBag.push({
                ...product,
                quantity: 1,
              });              
        } else {
            updatedBag[foundIndex].quantity += 1;
        }
    
        setBag(updatedBag);
        setActiveCounters(prev => ({ ...prev, [product.id]: true })); // Switch to counter mode
    };
    
    const handleIncrement = (productId) => {
        const updatedBag = bag.map(item => 
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setBag(updatedBag);
    };
    
    const handleDecrement = (productId) => {
        const updatedBag = bag
            .map(item => 
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0);
    
        setBag(updatedBag);
    
        // if we fully removed, hide the counter UI
        if (!updatedBag.find(item => item.id === productId)) {
            setActiveCounters(prev => {
                const newCounters = { ...prev };
                delete newCounters[productId];
                return newCounters;
            });
        }
    };
    
    const getBagQuantity = (productId) => {
        const item = bag.find(it => it.id === productId);
        return item?.quantity || 0;
    };
    
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        const newSubtotal = bag.reduce((acc, item) => {
            const unitAmount = item.default_price?.unit_amount || 0;
            return acc + unitAmount * item.quantity;
        }, 0);

        setSubtotal(newSubtotal);
    }, [bag]);

    return (
        <div className="inset-0 flex flex-1 min-h-screen pt-24 max-w-3xl mx-auto px-6 pb-6 w-full h-full overflow-hidden">
            <div className="flex flex-col items-center justify-start space-y-4 w-full animate-fade">
                <p class={`w-full font-mono text-xs font-bold uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down`} >
                    Good things come in 3s. Except the juice of a cow, which comes in a 6s, 8s, or 12s. Choose wisely.
                </p>
                <div class="flex flex-row w-full">
                    <img src={rack_1} alt="Cow Juice Rack" className="w-full sm:w-1/2 animate-fade-down border-[0.0px] border-black/50 rounded-sm" />
                </div>
                
                <p class={`w-full font-mono text-xs rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down animate-delay-500`} >
                    Since variety is the spice of life, we're offering three revolutionary ways to get the exact same Cow Juice into your life.
                </p>
                {/* errors / loading */}
                {loading && (
                    <div class="flex w-full items-center justify-center animate-fade animate-delay-200">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    </div>
                )}
                {error && (
                    <p className="flex w-full text-left font-mono text-xs text-red-600">{error}</p>
                )}

                {/* product grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {products.map((p) => {
                            const available = p.variants[0].inventory_quantity > 0 ? true : false; // <-- Tracks inventory to display whether product is actually for sale
                            return (
                            // Define state var to track whether "sold out" i.e., unavailable
                            
                            <div
                                key={p.id}
                                className="flex flex-col border-[0.5px] border-black dark:border-white rounded-sm p-2 space-y-2 animate-flip-down"
                            >
                                {!available ? (
                                    <div class="absolute inset-0 flex items-center justify-center bg-neutral-100/50">
                                        <div class="flex w-full h-full items-start justify-end">
                                            
                                            <a class="flex rotate-[20deg] font-mono uppercase border-[0.5px] border-black border-dashed text-xs text-white font-bold px-2 rounded-md bg-cowjuice-red cursor-default">Coming soon</a>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {/* <a class="absolute flex rotate-[30deg] -right-4 -top-2 w-auto h-auto font-mono uppercase border-[0.5px] border-black text-xs px-2 rounded-xl bg-black text-white animate-fade animate-delay-1000" onClick={() => navigate(`/shopify/product/${p.id}`)}>View</a> */}

                                {/* info */}
                                <div className="flex flex-col space-y-1">
                                    <span class="font-mono text-xs uppercase">{p.title}</span>
                                </div>

                                {/* add button */}
                                <button
                                    onClick={() => handleBuyNow(p)}
                                    className={`group flex w-full items-center justify-center text-[10px] font-mono uppercase ${!available ? 'bg-neutral-100' : 'bg-white'} border-[0.5px] border-black dark:border-white rounded-md px-1 py-1.5 sm:py-1 h-7 transition-all duration-300`}
                                >
                                        <p class=""><span className=" font-bold">${p.variants[0].price} </span>| Buy Now</p>
                                  
                                </button>
                                <button
                                    onClick={() => handleViewProduct(p)}
                                    className={`group flex w-full items-center justify-center text-[10px] font-mono uppercase ${!available ? 'bg-neutral-100' : 'bg-white'} border-[0.5px] border-black dark:border-white rounded-md px-1 py-1.5 sm:py-1 h-7 transition-all duration-300`}
                                >
                                        <p class="">View Product Details</p>
                                  
                                </button>
                                {/* Add to Bag / Quantity counter */}
                                {/* <div
                                    onClick={(e) => {
                                        // e.stopPropagation();
                                        if (!activeCounters[p.id]) {
                                            handleAddToBag(p);
                                        }
                                    }}
                                    className="group text-[10px] font-mono uppercase bg-white border-[0.5px] border-black dark:border-white rounded-full px-1 py-1.5 h-7 transition-colors duration-300"
                                >
                                {activeCounters[p.id] ? (
                                    <div className="flex flex-row w-full items-center justify-center space-x-4 h-auto">
                                        <button
                                            onClick={(e) => {
                                                // e.stopPropagation(); // Prevent bubbling up
                                                handleDecrement(p.id);
                                            }}
                                            className="text-xs font-mono border-[0.5px] border-black dark:border-white rounded-full w-6 h-3.5 flex items-center justify-center"
                                        >–</button>
                                        <span className="font-mono text-xs">{getBagQuantity(p.id)}</span>
                                        <button
                                            onClick={(e) => {
                                                // e.stopPropagation(); // Prevent bubbling up
                                                handleIncrement(p.id);
                                            }}
                                            className="text-xs font-mono border-[0.5px] border-black dark:border-white rounded-full w-6 h-3.5 flex items-center justify-center"
                                        >＋</button>
                                    </div>
                                ) : (
                                    <p className="flex w-full items-center justify-center">Add to bag</p>
                                )}
                                </div> */}

                                
                            </div>
                        )})}
                    </div>
                )}

                {/* divider + home button */}
                {products.length != 0 && (
                    <div class="flex flex-col w-full animate-fade-up animate-delay-200">
                        <div className="w-full border-b-[0.25px] border-black dark:border-white my-4" />

                        <div class="flex flex-col space-y-2 w-full">
                            <button
                                type="submit"
                                className={`flex w-full bg-black disabled:bg-black/50 text-white dark:bg-white dark:text-black text-xs font-mono p-2 rounded-sm transition-colors duration-300 ${checkoutError && 'animate-[shake_1s_ease-in-out_thrice]'} `}
                                disabled={bag.length == 0}
                                onClick={() => navigate(`/shopify/bag`)}
                            >
                            {products.length != 0 && loading ? (      
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <p>${parsePrice(subtotal)} in bag | Go to checkout</p>
                            )}
                            </button>
                            {checkoutError && <p class="flex w-full text-left text-xs font-mono animate-fade text-[#bf0a30]">{checkoutError}</p>}
                        </div>
                    
                    </div>
                )}
                {/* Footnotes below. */}
                {/* <div class="flex flex-1 flex-col w-full items-center justify-end space-y-2 py-2">
                    <div class="flex flex-col w-full items-center justify-center space-y-2 py-2 border-t-[0.5px] border-black animate-fade animate-delay-1000">
                    <p class="text-xs font-mono text-left w-full inline animate-flip-up animate-delay-75"><sup>[1]</sup> It's the exact same Cow Juice in different size packs. Choose away.</p>
                    <p class="text-xs font-mono text-left w-full inline animate-flip-up animate-delay-1000"><sup>[2]</sup> Product to ship immediately, with 2-4 day delivery.</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Products;