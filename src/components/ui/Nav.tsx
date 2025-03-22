import Link from "next/link";
import "@/styles/globals.css";
import Image from "next/image";

const Nav = () => {
    return (
            <nav className="flex items-center justify-between px-6 py-7 relative  z-30 ">

                <div className="flex-shrink-0 ">
                    <Link href="/">
                        <Image 
                            className="h-auto w-[154px]"
                            src="/images/logo.png" 
                            alt="logo"
                            height={40}
                            width={154} 
                            />
                    </Link>
                </div>
                <div className="hidden lg:flex justify-between items-center space-x-4 xl:space-x-12">
                <ul className="hidden md:flex space-x-5 xl:space-x-10 text-white  font-medium ">
                        <li className="group">
                            <Link href="/" className="transition">
                                Ana Səhifə
                            </Link>
                            <div className="w-0 mt-1 group-hover:w-full bg-white transition-all duration-500 h-[1px]"></div>
                        </li>
                        <li className="group">
                            <Link href="/about" className="transition">
                                Haqqımızda
                            </Link>
                            <div className="w-0 mt-1 group-hover:w-full bg-white transition-all duration-500 h-[1px]"></div>
                        </li>
                        <li className="group">
                            <Link href="/clinic_services" className="transition">
                                Xidmətlər
                            </Link>
                            <div className="w-0 mt-1 group-hover:w-full bg-white transition-all duration-500 h-[1px]"></div>
                        </li>
                        <li className="group">
                            <Link href="/doctors" className="transition">
                                Həkimlər
                            </Link>
                            <div className="w-0 mt-1 group-hover:w-full bg-white transition-all duration-500 h-[1px]"></div>
                        </li>
                        <li className="group">
                            <Link href="/blogs" className="transition">
                                Bloqlar
                            </Link>
                            <div className="w-0 mt-1 group-hover:w-full bg-white transition-all duration-500 h-[1px]"></div>
                        </li>
                        <li className="group">
                            <Link href="/courses" className="transition">
                                Kurslar
                            </Link>
                            <div className="w-0 mt-1 group-hover:w-full bg-white transition-all duration-500 h-[1px]"></div>
                        </li>
                    </ul>
                    <div className="h-9 opacity-45 bg-white w-[1.5px]"></div>

                    <div className="hidden md:flex text-white space-x-2 xl:space-x-5 items-center">
                        <div className="w-[36px] h-[40px]">
                            <Image 
                                src="/images/headphone-icon.png" 
                                alt="headphone"
                                height={40}
                                width={36} 
                                />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[16px] xl:text-[18px] font-medium">Çağırı Mərkəzi:</span>
                            <Link className="text-[20px] xl:text-[22px] font-bold hover:text-[#030d43]" href=''>+994505556575</Link>
                        </div>
                    </div>
                </div>
               
                <div className="lg:hidden">
                    <button className="focus:outline-none text-white text-3xl" aria-label="Open menu">
                        ☰
                    </button>
                </div>
            </nav>
    );
};

export default Nav;
