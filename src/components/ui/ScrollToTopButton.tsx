'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa";


export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <button
                onClick={scrollToTop}
                className={`
                        fixed bottom-[57px] right-[113px] z-[1000]
                        w-[82px] h-[82px] rounded-full
                        bg-[#243ffa] text-white
                        flex items-center justify-center
                        transition-opacity duration-500
                        ${showButton ? 'opacity-100 visible' : 'opacity-0 invisible'}
                        animate-pulse hover:cursor-pointer`}
                aria-label="Scroll to top"
            >
                <FaArrowUp className='text-3xl' />
            </button>

            <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(36, 63, 250, 0.99);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(36, 63, 250, 0.01);
          }
          100% {
            box-shadow: 0 0 0 25px rgba(36, 63, 250, 0.01);
          }
        }

        button {
          animation: pulse 2s infinite;
        }
      `}</style>
        </>
    );
}