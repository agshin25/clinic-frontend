import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

const AboutDoctor = () => {
    return (
        <section className="bg-[#f6f9ff] py-[60px] md:py-[70px] lg:py-[110px] xl:py-[130px] relative overflow-hidden">
            <div className="absolute left-[-320px] bottom-[-161px] w-[550px] h-[745px] bg-[url('/images/design-lft-img.png')] bg-no-repeat bg-contain z-0"></div>
            <div className="absolute right-[-297px] top-[-53px] w-[477px] h-[525px] bg-[url('/images/design-rt-img.png')] bg-no-repeat bg-contain z-0"></div>
            <div className="container md:max-w-[1400px] mx-auto relative z-10">
                <div className="w-full lg:w-[86%] mx-auto">
                    <div className="grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-2">
                        <div className="w-[260px] sm:w-[86%] md:w-[65%] mx-auto lg:w-full grid grid-cols-[130px_130px] sm:grid-cols-2 gap-2 items-center relative">
                            <div>
                                <Image
                                    className="w-[116px] h-[106px] sm:w-[236px] sm:h-[206px] md:w-[300px] lg:w-[256px] md:h-[226px] object-cover rounded-[10px]"
                                    src="/images/about-img1.jpg"
                                    alt="About Image 1"
                                    width={256}
                                    height={226}
                                />
                                <Image
                                    className="w-[116px] h-[106px] sm:w-[236px] md:w-[300px] lg:w-[256px] sm:h-[206px] md:h-[226px] object-cover rounded-[10px] mt-[20px]"
                                    src="/images/about-img3.jpg"
                                    alt="About Image 3"
                                    width={256}
                                    height={226}
                                />
                            </div>
                            <div>
                                <Image
                                    className="w-[115px] h-[155px] sm:w-[225px] sm:h-[375px] md:h-[395px] md:w-[295px] lg:w-[275px] object-cover rounded-[10px]"
                                    src="/images/about-img2.jpg"
                                    alt="About Image 2"
                                    width={275}
                                    height={395}
                                />
                            </div>
                            <div className="video w-[108px] h-[108px] sm:w-[168px] sm:h-[168px] rounded-full bg-[#243ffa] absolute inset-0 mx-auto top-[30%]">
                                <Link href="">
                                    <div className="bg-white w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] flex items-center justify-center rounded-full z-10 absolute top-[30%] inset-0 mx-auto">
                                        <Image
                                            src="/images/play-icon.png"
                                            height={20}
                                            width={20}
                                            alt="Play Icon"
                                        />
                                    </div>
                                </Link>
                                <div className="h-[88px] w-[88px] sm:w-[168px] sm:h-[168px] absolute inset-0 mx-auto top-2.5 sm:left-3 sm:top-3">
                                    <Image
                                        src="/images/rotate-txt.png"
                                        alt="Rotate Text"
                                        width={145}
                                        height={168}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col lg:ml-[70px] px-5 lg:px-0 text-center lg:text-left">
                                <span className="mb-[10px] text-[14px] md:text-[16px] text-[#243ffa] tracking-[1px]">ABOUT US</span>
                                <h2 className="text-[24px] sm:text-[28px] md:text-[32px] text-[#030d43] leading-[28px] sm:leading-[42px] font-semibold mb-[10px] sm:mb-[26px]">
                                    Welcome to Medwell Hospital & Healthcare
                                </h2>
                                <p className="text-[#757887] mb-[20px] sm:mb-[28px] text-[15px] leading-[24px]">
                                    Donec pulvinar tellus eget magna aliquet ultricies. nec eleifend
                                    sem convallis vitae soluta nobis est eligendi optio cumque nihil
                                    impedit quo minus id quod maxime placeat facere.
                                </p>
                                <div className="flex flex-col sm:flex-row mx-auto sm:mx-0 sm:justify-around lg:grid grid-cols-2 font-medium text-[#030d43] mb-[25px] sm:mb-[32px] text-[15px]">
                                    <ul>
                                        <li className="mb-[5px] flex items-center gap-3">
                                            <FaCheckCircle className="text-[#243ffa]" />
                                            Monthly Checkups
                                        </li>
                                        <li className="mb-[5px] flex items-center gap-3">
                                            <FaCheckCircle className="text-[#243ffa]" />
                                            Caring Medical Team
                                        </li>
                                        <li className="mb-[5px] flex items-center gap-3">
                                            <FaCheckCircle className="text-[#243ffa]" />
                                            Proactive and Fast Results
                                        </li>
                                    </ul>
                                    <ul>
                                        <li className="mb-[5px] flex items-center gap-3">
                                            <FaCheckCircle className="text-[#243ffa]" />
                                            Cosmetic Filling
                                        </li>
                                        <li className="mb-[5px] flex items-center gap-3">
                                            <FaCheckCircle className="text-[#243ffa]" />
                                            Dental X-Ray
                                        </li>
                                        <li className="mb-[5px] flex items-center gap-3">
                                            <FaCheckCircle className="text-[#243ffa]" />
                                            Complete Crown
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start gap-[19px] text-[#243ffa]">
                                    <Link
                                        href="/about"
                                        className="text-[14px] lg:text-[20px] font-semibold transform transition duration-700 hover:-translate-y-2"
                                    >
                                        Read More
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] lg:w-[65px] lg:h-[65px] rounded-full flex items-center justify-center border-[1px] border-[#243ffa] text-2xl lg:text-3xl hover:text-white hover:bg-[#243ffa] transform transition duration-700 hover:-translate-y-2"
                                    >
                                        <GoArrowUpRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutDoctor;
