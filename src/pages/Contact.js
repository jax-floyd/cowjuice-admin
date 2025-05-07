import React, { useState, useEffect } from 'react';

const Contact = () => {

    return (
        <div className="inset-0 flex flex-col flex-1 min-h-screen max-w-3xl mx-auto px-6 pb-6 pt-24 w-full h-full items-center justify-between overflow-hidden">
          <div className="flex flex-col items-center justify-start space-y-4 w-full animate-fade">
                <p className="font-mono text-xs text-left w-full">
                    At present, Cow Juice Inc., including its wholly-owned and partially-owned subsidiaries, affiliates, and assigns (<span class="font-bold">"Cow Juice Entities"</span>), offers precisely one (1) method of official communication.
                </p>
                <p className="font-mono text-xs text-left w-full">
                    All inquiries, requests, and other communications must be initiated by emitting an audible "Moo" sound, directed skyward toward a full lunar event (<span class="font-bold">Full Moon Mooing Protocol"</span>).
                </p>
                <p className="font-mono text-xs text-left w-full">
                    Upon verification of successful compliance, an authorized representative (<span class="font-bold">"Cow Juice Man"</span>) will respond in an appropriately timely manner as determined by, and at the sole discretion of, Cow Juice Entities.
                </p>
                <p className="font-mono text-xs text-left w-full">
                    We thank you kindly for your understanding.<sup>[1]</sup>
                </p>
            </div>

            {/* Footnotes below. */}
            <div class="flex w-full flex-1 flex-col max-w-3xl items-center justify-end space-y-2 py-2">
                <div class="flex flex-col w-full items-center justify-center space-y-2 py-2 border-t-[0.5px] border-black animate-fade animate-delay-75">
                    <p class="text-xs font-mono text-left w-full inline animate-flip-up animate-delay-75"><sup>[1]</sup> All jokes aside, we'd love to hear from you.</p>
                    <button class="flex w-full p-2 font-bold bg-white border-[0.5px] border-black rounded-sm text-xs font-mono uppercase animate-flip-down animate-delay-100">Email Cow Juice Man</button>
                    
                </div>
            </div>
        </div>
    );
};

export default Contact;
