import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import ReviewInputModal from '../components/ReviewInputModal'; // Assuming you have a modal component for input

const dummyReviews = Array.from({ length: 25 }, (_, i) => ({
  date: `2024-0${(i % 9) + 1}-0${(i % 28) + 1}`,
  text: [
    'Tastes like milk, but better.',
    'I wasn’t ready for it, but I am now.',
    'Ultra-retorted? Ultra-impressed.',
    'Better than my childhood memories.',
    'Even my lactose-intolerant roommate stole a can.',
    'Honestly? The best beverage I’ve had in 2025.',
    'Poured it in cereal. Life changed.',
    'Felt like drinking nostalgia in a can.',
    'Confused but in a good way.',
    'The milk is canned. My expectations are shattered.'
  ][i % 10]
}));

// Pull actual reviews from server endpoint get-reviews
const fetchReviews = async () => {
    const response = await fetch('https://api.gotcowjuice.com:2000/get-reviews', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
    });
    const data = await response.json();  
    console.log('Fetched reviews:', data);
    return data.reviews || []
}


const floatVariants = {
  animate: (i) => ({
    x: [0, (i % 2 === 0 ? 1 : -1) * 20],
    y: [0, (i % 3 === 0 ? 1 : -1) * 30],
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 4 + (i % 4),
      ease: 'easeInOut'
    }
  })
};

const Reviews = () => {

    const [reviews, setReviews] = useState([]); // State to hold fetched reviews
    const [modal, setModal] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [review, setReview] = useState('');

    const [status,   setStatus]   = useState('idle'); // idle | error | success

    const [loading, setLoading] = useState(false);
    const handlePostFeedback = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000)

        return;
    };

    useEffect(() => {
        setTimeout(() => {
            if (!modal) {
                setModal(true);
            };
        }, 750); // Show the input dialog after 2.5 seconds
    }, []);

    useEffect(() => {
        const fetchAndSetReviews = async () => {
            try {
                const reviews = await fetchReviews();
                if (!reviews || reviews.length === 0) {
                    throw new Error('No reviews found');
                }
                console.log('Fetched reviews:', reviews);
                setReviews(reviews);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
                setReviews(dummyReviews); // Fallback to dummy reviews on error
            }
        };

        fetchAndSetReviews();
    }, []);

    const formatTimestamp = ( dateString  ) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <>
            {modal && (
                <>
                    {/* dim + blur the page beneath */}
                    <div className="fixed inset-0 z-40 animate-fade animate-delay-[0ms]" />
                    {/* modal itself has higher z-index */}
                    <ReviewInputModal
                        onUnlock={() => setModal(null)}
                        class="z-50"          // give the modal a higher z if needed
                    />
                </>
            )}
            <div onClick={() => setModal(!modal)} className="relative inset-0 flex flex-col flex-1 min-h-screen mx-auto px-6 pb-6 pt-6 w-full h-full overflow-hidden cursor-pointer">
                <div className="flex flex-1 flex-col items-center justify-center space-y-4 w-full animate-fade">
                
                    {/* Floating Reviews; absolutely positioned; build UI separate and apart from their presence */}
                    <div className="absolute inset-0 z-0 animate-fade">
                        {reviews.map((review, i) => (
                        <motion.button
                            key={i}
                            className="absolute flex flex-col items-start max-w-xs border-[0.5px] border-black p-1 rounded-lg bg-cowjuice-gold/10 hover:bg-cowjuice-white hover:z-20 text-[10px] font-mono uppercase shadow-md select-none transition-colors duration-300"
                            custom={i}
                            variants={floatVariants}
                            animate="animate"
                            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up to the parent div
                            initial={{
                                top: `${Math.random() * 90}%`,
                                left: `${Math.random() * 90}%`
                            }}
                        >
                            <p className="text-left leading-3">"{review.text}"</p>
                            <p className="text-left text-[10px] opacity-60 mt-1">{formatTimestamp(review.timestamp)}</p>
                        </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reviews;