import React from 'react';

const Contact = () => {
    return (
        <div class="max-w-3xl mx-auto p-4">
            <div class="flex flex-col items-start justify-start">
                <div class="flex flex-col items-start justify-between space-y-4">
                    <p class="uppercase font-mono text-xs animate-flip-up">
                        Get in touch
                    </p>

                    <div class="border-[0.5px] w-full" />

                    <p class="font-mono text-xs animate-fade-down">
                        If you have cool ideas you're interested in building, or if you just want to talk about problems our world faces, I really would love to hear from you.
                    </p>

                    <p class="font-mono text-xs animate-fade-down animate-delay-500">
                        Send me an email at <a href="mailto:jaxfloyd@stanford.edu" class="font-bold hover:underline cursor-pointer">jaxfloyd@stanford.edu</a> and we can find a time to chat.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Contact;