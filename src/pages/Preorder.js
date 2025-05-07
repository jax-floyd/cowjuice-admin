import React, { useState, useEffect,  useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import mixpanel from 'mixpanel-browser';

import { useMasterContext } from '../contexts/MasterContext';
import { useAnalyticsContext } from '../contexts/AnalyticsContext';

// graphics
import mockup_3 from '../assets/mockup_3.png';
import rack_2 from '../assets/rack_2.png';
import bull_1 from '../assets/bull_1.svg'

// functions
import triggerPostToWriteZip from '../functions/triggerPostToWriteZip.js'

// Make sure you get your public Stripe key from the Stripe dashboard
const stripePromise = loadStripe('pk_live_51QYDnqBszlfI2zVMIN0fzMYCs2oCGqhny8EA6yZwpbPigqIieLsJ9jZWLvBqyVlwpMHTSXT6bUGb3aSjhwn6p72i00XyAVUObD');

const Preorder = () => {

  const { caseNumber } = useMasterContext();
  const { trackEvent } = useAnalyticsContext();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [zipSubmitted, setZipSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [displayStage, setDisplayStage] = useState(0);

  const [stage, setStage] = useState(0);
  const previousStageRef = useRef(stage);

  useEffect(() => {
    previousStageRef.current = stage; // Store the current stage in the ref
  }, [stage]);

  const previousStage = previousStageRef.current;

  const [name, setName] = useState({
    firstName: '',
    lastName: ''
  });

  const handleNameChange = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value
    });
  };
  
  const [address, setAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const [zipError, setZipError] = useState('')
  const handleZipCodeSubmit = (e) => {
    e.preventDefault();
  
    // Regex check: 5 digits only
    if (!/^\d{5}$/.test(address.zip)) {
      setZipError('Please enter a valid 5-digit ZIP code.');
      return; // Do not submit if invalid
    }
  
    setLoading(true);
    mixpanel.track('Button Clicked', {
      button_name: 'Submit Button',
      page: 'Contact Us',
    });

    triggerPostToWriteZip(address.zip);
    
    setTimeout(() => {
      setLoading(false);
      setZipSubmitted(true); // Proceed to address input
    }, 1000);
  };
  
  const [nextError, setNextError] = useState('');
  const handleNextClick = (e) => {
    console.log('handleNext Click called');
    e.preventDefault();

    // Basic email pattern check: something@something.something
    // Not bulletproof, but good for demonstration
    if (!/^\S+@\S+\.[\S]+$/.test(email)) {
      setNextError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    setLoading(false);
    setStage(stage + 1);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    // Only start the countdown if the timer is greater than 0
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1); // Decrease the time by 1 every second
      }, 1000); // 1000ms = 1 second

      // Clear the interval once the timer reaches 0
      return () => clearInterval(intervalId);
    } else {
      // When timeLeft reaches 0, trigger the session expiration logic
      trackEvent("Session Expired", { email });
      window.location.href = "/";
    }
  }, [timeLeft, email, trackEvent]);

  const messages = [
    "Reserve one of the first 983 cases of Cow Juice, to join:",
    "The 983 Club",
    "As a member, you'll have a direct line to our Founder.",
    "And get early access to every new flavor we ever release."
  ];

  useEffect(() => {
    if (timeLeft === 0) {
      window.location.href = "/";
    }
  }, [timeLeft]);

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: 2400,
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro'
      }
    ]
  };

  const [bodal, setBodal] = useState(true);
  const [bull, setBull] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setBull(false)
    }, 700);

    setTimeout(() => {
      setBodal(false)
    }, 0);
  }, []);

  return (
    <Elements stripe={stripePromise} options={options}>
      {bodal ? (
        <>
          <div class="w-full h-full fixed inset-0 z-50 bg-white">
            <div class="w-full h-full fixed inset-0 z-50 bg-white animate-fade">
                {bull && <img src={bull_1} alt="Bull" class="w-full h-full object-cover animate-fade-out animate-delay-300" /> }
            </div>
          </div>
        </>
      ) : (
        <>
        <div className="inset-0 flex flex-1 max-w-3xl mx-auto p-6 w-full h-full overflow-hidden">
          <div className="flex flex-col items-center justify-start space-y-4 w-full animate-fade">
            {(!zipSubmitted) ? (
              <>
                <p class={`w-full font-mono text-xs font-bold uppercase rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down`} >
                  Pre-order the world's first can of milk.
                </p>
                <img src={mockup_3} alt="Cow Juice Mockup" className="sm:w-1/2 w-full animate-fade-down animate-delay-200 mb-4 " />              
                <div class="flex flex-col space-y-4 w-full animate-fade animate-delay-500">
                  {messages.map((message, index) => (
                    index <= displayStage && (
                      <p
                        key={index}
                        className={`w-full font-mono text-xs ${index === 1 ? 'font-bold uppercase text-left p-2 border-[0.5px] rounded-sm border-black dark:bg-white dark:border-white dark:text-black animate-flip-down' : ''}`}
                      >
                        <Typewriter
                          options={{
                            delay: 6,
                            cursor: '',
                            autoStart: true,
                          }}
                          onInit={(typewriter) => {
                            typewriter
                              .typeString(message)
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
                {displayStage === messages.length && (
                  <div class={`flex w-full ${zipSubmitted && 'animate-fade-right'}`}>
                    <form
                      onSubmit={handleZipCodeSubmit}
                      className={`flex flex-col space-y-4 animate-fade-up w-full`}
                    >
                      <input
                        type="text"
                        name="zip"
                        placeholder="Enter zip code"
                        value={address.zip}
                        onChange={handleAddressChange}
                        required
                        className="border-b py-2 rounded-none focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                      />
                      <div class="flex flex-col space-y-2">
                        <button
                          type="submit"
                          className={`flex w-full bg-black text-white dark:bg-white dark:text-black text-xs font-mono p-2 rounded-sm ${zipError && 'animate-[shake_1s_ease-in-out_thrice]'}`}
                          disabled={loading}
                        >
                          {loading ? (      
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                          </svg>
                          ) : (
                            <p>Check availability</p>
                          )}
                        </button>
                        {zipError && <p class="flex w-full text-left text-xs font-mono animate-fade text-red-500">{zipError}</p>}
                      </div>
                    </form>
                  </div>

                )}
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-4 mt-8 w-full animate-fade">
                  <p className="font-mono text-xs font-bold uppercase">
                    It's your lucky day: We're holding Case #{caseNumber} for you for the next {formatTime(timeLeft)}.
                  </p>
                  <img src={rack_2} alt="Cow Juice Mockup" className="w-full animate-fade-down border-black/50 mb-4" />
                  <p className="font-mono text-xs">Each case contains <span class="font-bold underline">8</span> glorious <span class="font-bold underline">16oz cans</span> of <span class="font-bold underline">2% Reduced Fat</span> Cow Juice.</p>
                  {stage === 2 && (
                    <p className="font-mono text-xs animate-fade-down">Cases cost <span class="font-bold underline underline-offset-1">$24</span> & ship this March with a money-back guarantee.</p>
                  )}
                  
                  <div className="flex flex-col space-y-2 mt-8 w-full animate-fade-down">
                    {stage === 0 && (
                      <div class={`flex flex-col space-y-4 ${previousStage === 1 && 'animate-fade-right'}`}>
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full border-b rounded-none py-1 focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                        />
                        <div class="flex flex-row w-full space-x-2">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={name.firstName}
                            onChange={handleNameChange}
                            required
                            className="w-full border-b rounded-none py-1 focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                          />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={name.lastName}
                            onChange={handleNameChange}
                            required
                            className="w-full border-b rounded-none py-1 focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                          />
                        </div>
                        <div class="flex flex-col space-y-2">
                          <button 
                            disabled={email == '' || name.firstName == '' || name.lastName == ''}
                            className={`font-mono text-xs flex w-full bg-black text-white dark:bg-white dark:text-black p-2 rounded-sm`}
                            onClick={handleNextClick}
                          >
                            Next
                          </button>
                          <button
                            className="flex w-full bg-white text-black dark:bg-black dark:text-white text-xs font-mono p-2 border border-black/50 dark:border-white rounded-sm"
                            onClick={() => window.location.href="/preorder"}
                          >Back</button>
                          {nextError && <p class="flex w-full text-left text-xs font-mono animate-fade text-red-500">{nextError}</p>}
                        </div>
                      </div>
                    )}

                    {stage === 1 && (
                      <div class="flex flex-col space-y-4 animate-fade-left">
                        <input
                          type="text"
                          name="address1"
                          placeholder="Address 1"
                          value={address.address1}
                          onChange={handleAddressChange}
                          required
                          className="border-b rounded-none py-1 focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                        />
                        <input
                          type="text"
                          name="address2"
                          placeholder="Address 2 (optional)"
                          value={address.address2}
                          onChange={handleAddressChange}
                          className="border-b rounded-none py-1 focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                        />
                        <div className="flex flex-row w-full space-x-2">
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={address.city}
                            onChange={handleAddressChange}
                            required
                            className="w-full border-b rounded-none py-1 focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                          />
                          <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={address.state}
                            onChange={handleAddressChange}
                            required
                            className="w-full border-b rounded-none py-1 focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                          />
                          <input
                            type="text"
                            name="zip"
                            placeholder="Zip Code"
                            value={address.zip}
                            onChange={handleAddressChange}
                            required
                            className="w-full border-b rounded-none py-1 focus:outline-none border-black/50 dark:border-white bg-transparent text-xs font-mono"
                          />
                        </div>
                        <div class="flex flex-col space-y-2">
                          <button 
                            disabled={address.address1 == '' || address.city == '' || address.state == '' || address.zip == ''}
                            className={`font-mono text-xs flex w-full bg-black text-white dark:bg-white dark:text-black p-2 rounded-sm`}
                            onClick={() => setStage(stage + 1)}
                          >
                            Continue to payment
                          </button>
                          <button
                            type="submit"
                            className="flex w-full bg-white text-black dark:bg-black dark:text-white text-xs font-mono p-2 border border-black/50 dark:border-white rounded-sm"
                            onClick={() => setStage((prevStage) => Math.max(prevStage - 1, 0))}
                          >Back</button>
                        </div>
                      </div>
                    )}

                    {stage === 2 && (
                      <div class="flex w-full animate-fade-left">
                        <PaymentForm email={email} name={name} address={address} setStage={setStage} />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>

      )}
    </Elements>
  );
};

const PaymentForm = ({ email, name, address, setStage }) => {

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    console.log('handleSubmit() function called.');
    e.preventDefault();
    setLoading(true);
  
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      setLoading(false);
      return;
    }
  
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError);
      setLoading(false);
      return;
    }
  
    // Call your server to create a payment intent
    const response = await fetch("https://api.gotcowjuice.com:2000/create-payment-intent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 24, email, address }),
    });
  
    const { clientSecret, paymentIntentId } = await response.json();
  
    if (clientSecret) {
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/thanks?paymentId=${paymentIntentId}`, // Include payment ID in the URL
          shipping: {
            name: name.firstName + ' ' + name.lastName,
            address: {
              line1: address.address1,
              line2: address.address2,
              city: address.city,
              postal_code: address.zip,
              state: address.state,
            },
          },
        }
      });
  
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        setError(result.error.message);
        setLoading(false);
      }
    }
  };

  const options = {
    layout: 'tabs',
    wallets: {
      applePay: 'auto',
    }
  };
  

  return (
    <div class="flex w-full flex-col">
      {/* <CardElement options={{ style: customStyle }} /> */}
      <PaymentElement options={options} applePay='auto' />
      <div class="flex flex-col space-y-2">
        <button 
          disabled={!stripe}
          onClick={handleSubmit}
          className={`font-mono text-xs flex w-full bg-black text-white dark:bg-white dark:text-black p-2 rounded-sm mt-4`}
        >
          {loading ? (      
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-spin">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
          ) : (
            <p>Pay $24</p>
          )}
          
        </button>
        <button
            type="button"
            className="flex w-full bg-white text-black dark:bg-black dark:text-white text-xs font-mono p-2 border border-black/50 dark:border-white rounded-sm"
            onClick={() => setStage((prevStage) => Math.max(prevStage - 1, 0))}
        >
            Back
        </button>
      </div>
    </div>
  );
};

export default Preorder;
