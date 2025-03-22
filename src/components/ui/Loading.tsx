'use client';
import React, { useEffect, useState } from 'react';

const loaderStyles = `
.loader-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 99999;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50px;
  height: 50px;
  font-size: 0;
  color: #4F6DE6;
  display: inline-block;
  margin: -25px 0 0 -25px;
  text-indent: -9999em;
  transform: translateZ(0);
}

.loader-circle {
  background-color: #4F6DE6;
  display: inline-block;
  float: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  opacity: 0.5;
  border-radius: 50%;
  animation: ballPulseDouble 2s ease-in-out infinite;
}

.loader-circle:last-child {
  animation-delay: -1s;
}

@keyframes ballPulseDouble {
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
`;

const Loading: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div className="loader-mask">
                <div className="loader">
                    <div className="loader-circle"></div>
                    <div className="loader-circle"></div>
                </div>
            </div>

            <style jsx>{loaderStyles}</style>
        </>
    );
};

export default Loading;