import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

import { useMasterContext } from '../contexts/MasterContext';

const Welcome = () => {

  const { caseNumber } = useMasterContext();

  const [paymentId, setPaymentId] = useState(null);
  const location = useLocation();
  const [displayStage, setDisplayStage] = useState(0);

  const messages = [
    "Payment approved.",
    "Welcome:",
    "The 983 Club",
    `Your case reservation: #${caseNumber + 1}`, // <-- Case count is decremented on Thanks page so we have to add back to show the accurate just-purchased number.
    `Your payment ID: ${paymentId}`,
    "And now, a special perk of your 983 Club membership: A direct line to the College Dropout:",
    "(917) 863-1395",
    "Don't abuse it. But he does want to hear from you. So send him a text to share your ideas for how we take this to the moon.",
  ];

  useEffect(() => {
    // Retrieve payment ID from query params
    const queryParams = new URLSearchParams(location.search);
    setPaymentId(queryParams.get('paymentId'));
  }, [location]);

  return (
    <div className="flex flex-1 max-w-3xl mx-auto p-6 w-full h-full">
      <div className="flex w-full flex-col items-center justify-start space-y-4 animate-fade">
        {messages.map((message, index) => (
            index <= displayStage && (
            <p
                key={index}
                className={`w-full font-mono text-xs text-left ${index === 2 ? 'font-bold uppercase text-center p-2 border-[0.5px] rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-fade-down' : index === 6 ? 'font-bold uppercase text-center p-2 border-[0.5px] rounded-sm bg-black text-white dark:text-black dark:bg-white dark:border-black animate-fade-down' : ''}`}
            >
                <Typewriter
                options={{
                    delay: 18,
                    cursor: '',
                    autoStart: true,
                }}
                onInit={(typewriter) => {
                    typewriter
                    .typeString(message)
                    .pauseFor(9)
                    .callFunction(() => {
                        if (index < messages.length - 1) {
                            setTimeout(() => setDisplayStage(displayStage + 1), 500);
                        } else {
                            setTimeout(() => setDisplayStage(messages.length), 500);
                        }
                    })
                    .start();
                }}
                />
            </p>
            )
        ))}
      </div>
    </div>
  );
};

export default Welcome;