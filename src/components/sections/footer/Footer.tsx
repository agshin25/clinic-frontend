"use client"
import { Service } from "@/interfaces/service";
import { useGetServicesQuery } from "@/services/serviceApi";
import Image from "next/image"
import Link from "next/link";
import { FaAngleRight, FaMapMarkerAlt, FaEnvelope, FaHeadphones, FaPhoneAlt, FaPaperPlane, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";



const Footer = () => {
    const {data} = useGetServicesQuery()
    return (
        <footer className="bg-[#0d1f42]">
            <div className="w-full bg-[#0f2349] pt-[100px] pb-[80px]">
                <div className="container  md:max-w-[1400px] mx-auto">
                    <div className="w-[86%] mx-auto">
                        <div className="flex flex-col items-center sm:items-start sm:grid sm:grid-cols-[50%_50%] md:grid-cols-[29%_38%_36%] lg:grid-cols-[31%_19%_24%_26%] leading-[27px]">
                            <div className="text-[16px] col-span-2 md:col-span-3 mx-auto lg:col-span-1 text-[#a2b1cc] sm:pr-[50px]">
                                <figure className="mb-[22px] flex justify-center lg:justify-start">
                                    <Image alt="logo" className="h-auto w-[154px]" height={55} width={205} src={'/images/logo.png'} />
                                </figure>
                                <p className="mb-[7px] text-center lg:text-left">Quis autem vel eum iure reprehenderit rui
                                    in ea voluptate velit
                                    illum rui dolorem eum fugiat...
                                </p>
                                <p className="text-center lg:text-left">
                                    Suscipit laboriosam, nisi ut aliruid commo
                                    nostrum veniam...
                                </p>
                            </div>
                            <div className="sm:pl-[7px] pt-[18px]">
                                <h4 className="text-[18px] w-[235px] sm:text-[20px] md:text-[22px] lg:text-[24px] mb-[20px] font-medium text-white">Xidmətlərimiz</h4>   
                                <ul>
                                    {data?.slice(0, 5).map((item: Service) => (
                                        <li key={item.id} className="flex items-center gap-4 text-white mb-[3px] text-[16px]">
                                            <FaAngleRight className="text-[18px]" />
                                            <Link className="hover:text-[#007bff] text-[#a2b1cc] hover:underline" href=''>{item.title}</Link>
                                        </li> 
                                    ))}
                                </ul>    
                            </div>
                            <div className="pt-[18px] pl-[2px] pr-[20px]">
                                <h4 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] mb-[20px] font-medium text-white">Bizimlə Əlaqə</h4>
                                <ul>
                                    <li className="flex mb-[6px] gap-4 text-[16px] text-[#a2b1cc]">
                                        <FaMapMarkerAlt className="mt-[5px] text-[18px] text-white" />
                                        121 King Street Melbourne, <br />3000, Australia
                                    </li>
                                    <li className="flex mb-[6px] gap-4 text-[16px] text-[#a2b1cc]">
                                        <FaEnvelope className="mt-[5px] text-[18px] text-white" />
                                        <Link href='' className="hover:underline hover:text-[#007bff]">info@medwell.com</Link>
                                    </li>
                                    <li className="flex mb-[6px] gap-4 text-[16px] text-[#a2b1cc]">
                                        <FaHeadphones className="mt-[5px] text-[18px] text-white" />
                                        <Link href='' className="hover:underline hover:text-[#007bff]">+5689 2589 6325</Link>
                                    </li>
                                    <li className="flex mb-[6px] gap-4 text-[16px] text-[#a2b1cc]">
                                        <FaPhoneAlt className="mt-[5px] text-[18px] text-white" />
                                        <Link href='' className="hover:underline hover:text-[#007bff]">+1-202-555-0153</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-[18px] pl-[3px] col-span-2 md:col-span-1">
                                <h4 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium text-white whitespace-nowrap mb-[19px]">Subscribe to Newsletter</h4>
                                <div className="relative mb-[31px]">
                                    <input className="placeholder:text-[#a2b1cc] caret-white text-[14px] w-full  outline-none py-[8px] border-b-[1px] border-[#a2b1cc]" type="text" placeholder="Enter Your Email Adress:" />
                                    <button className="absolute top-[25%] text-[22px] right-2 cursor-pointer" aria-label="Send message">
                                        <FaPaperPlane className="text-[#243ffa] font-extrabold hover:text-white" />
                                    </button>
                                </div>
                                <ul className="flex text-white justify-center md:justify-start">
                                    <li className="flex justify-center items-center h-[40px] w-[40px] rounded-full mx-[3px] bg-[#243ffa] border-[1px] border-transparent text-[16px] cursor-pointer hover:border-[#243ffa] hover:text-[#243ffa] hover:bg-white transform transition duration-700 hover:-translate-y-2">
                                        <Link href=''>
                                            <FaFacebookF />
                                        </Link>
                                    </li>
                                    <li className="flex justify-center items-center h-[40px] w-[40px] rounded-full mx-[3px] bg-[#243ffa] border-[1px] border-transparent text-[16px] cursor-pointer hover:border-[#243ffa] hover:text-[#243ffa] hover:bg-white transform transition duration-700 hover:-translate-y-2">
                                        <Link href=''>
                                            <FaTwitter />
                                        </Link>
                                    </li>
                                    <li className="flex justify-center items-center h-[40px] w-[40px] rounded-full mx-[3px] bg-[#243ffa] border-[1px] border-transparent text-[16px] cursor-pointer hover:border-[#243ffa] hover:text-[#243ffa] hover:bg-white transform transition duration-700 hover:-translate-y-2">
                                        <Link href=''>
                                            <FaLinkedinIn />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <span className="block text-[14px] leading-[18px] text-[#a2b1cc] p-[20px]">Copyright © 2023 medwell All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer