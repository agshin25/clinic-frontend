"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.6, ease: "easeIn" } },
};

export default function Banner() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });
    const [shouldRender, setShouldRender] = useState(false);

 
    useEffect(() => {
        if (isInView) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 600); 
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center sm:items-start sm:grid sm:grid-cols-2 py-[30px] md:py-0 md:pt-[35px] lg:pt-[60px] mx-auto px-3 w-[95%]"
        >
            <div className="text-white flex flex-col max-h-[250px] gap-3 row-span-1">
                <AnimatePresence>
                    {shouldRender && (
                        <>
                            <motion.h1
                                className="text-center sm:text-left text-[26px] sm:text-[33px] md:text-[40px] lg:text-[45px] xl:text-[48px] font-bold w-[100%] lg:w-[85%] xl:w-[70%]"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={textVariants}
                                transition={{ delay: 0.2 }}
                            >
                                Medical &amp; Health Care Solutions.
                            </motion.h1>

                            <motion.p
                                className="text-center sm:text-left text-[15px] md:text-[18px] w-[95%] sm:w-[90%] lg:w-[60%] xl:w-[70%]"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={textVariants}
                                transition={{ delay: 0.4 }}
                            >
                                Caring is our calling. Changing Health Care for Good. We're here for life. Feel better.
                            </motion.p>

                            <motion.div
                                className="md:pt-5 mb-[10px] sm:mb-0 flex space-x-3 xl:space-x-5 items-center justify-center sm:justify-start"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={textVariants}
                                transition={{ delay: 0.6 }}
                            >
                                <Link
                                    className="font-semibold text-[15px] lg:text-[20px] transform transition duration-700 hover:-translate-y-2"
                                    href="#"
                                >
                                    Book an Appointment
                                </Link>
                                <Link
                                    href="#"
                                    className="border-[1px] rounded-full p-2 lg:p-4 transform transition duration-700 hover:-translate-y-2"
                                >
                                    <GoArrowUpRight className="lg:text-3xl" />
                                </Link>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex relative row-span-1">
                <Image
                    src="/images/doctor-img.png"
                    className="max-w-[250px] sm:max-w-[276px] md:max-w-[360px] h-auto lg:max-w-[450px] xl:max-w-[510px] lg:ml-[-190px] mb-[-30px] md:mb-0"
                    alt="Doctor"
                    width={510}
                    height={600}
                />
                <div className="hidden lg:block absolute right-[-10px] w-[80%]">
                    <AnimatePresence>
                        {shouldRender && (
                            <motion.span
                                className="text-[18px] border-l-4 leading-8 pl-5 text-white block"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={textVariants}
                                transition={{ delay: 0.8 }}
                            >
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}