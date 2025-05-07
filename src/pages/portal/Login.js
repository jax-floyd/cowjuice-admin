import React from 'react';

const Login = () => {
    
    return (
        <div 
            class="w-full flex flex-col flex-1 max-w-7xl mx-auto p-4 items-center justify-center animate-fade"
        >
            <div class="flex flex-col items-center justify-center max-w-xl space-y-2">
                <p class="font-mono text-xs uppercase font-bold">login homie. can't have no snoopin'</p>
                <input
                    type="email"
                    name="zip"
                    placeholder="Username"
                    required
                    className="border-b w-full py-1 rounded-none focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                />
                <input
                    type="password"
                    name="zip"
                    placeholder="Password"
                    required
                    className="border-b w-full py-1 rounded-none focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                />
                <a href="/" class="flex w-full font-mono text-xs rounded-md border-[0.5px] border-black px-2 py-1 animate-flip-up animate-delay-500">login</a>

            </div>
            
        </div>
    );
};

export default Login;
