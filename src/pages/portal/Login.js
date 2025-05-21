import React, { useState } from 'react';

const Login = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    return (
        <div className="inset-0 flex flex-row items-start justify-center flex-1 min-h-screen pt-24 px-6 pb-6 w-full h-full overflow-hidden">
            <div className="flex flex-1 max-w-6xl mx-auto w-full h-full">
                <div className="flex flex-col items-start justify-start space-y-4 w-full animate-fade">
                    <p class="font-mono text-xs uppercase font-bold">login homie. can't have no snoopin'</p>
                    <div className="flex flex-col w-full space-y-2 animate-fade-up animate-delay-500">
                        
                        {/* <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-right animate-delay-[500ms]" />
                        <input name="phone" type="tel" placeholder="Phone (optional)" onChange={handleChange} className="text-xs font-mono border-[0.5px] border-black p-2 sm:py-4 sm:px-2 rounded-sm focus:outline-none focus:bg-black/5 transition-colors duration-300 animate-fade-left animate-delay-[600ms]" /> */}
                        
                        {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

                        <div className="flex flex-col w-full sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">

                            <button
                                type="submit"
                                className="flex text-xs text-left font-mono w-full font-bold uppercase p-2 sm:py-4 sm:px-2 border-[0.5px] rounded-sm border-black bg-black text-white disabled:opacity-50 animate-flip-up animate-delay-[800ms]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Access Portal'}
                            </button>
                        </div>
                        </div>
                </div>
            </div>
            
        </div>
    );
};

export default Login;
