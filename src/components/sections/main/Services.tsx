"use client"
import Link from "next/link"
import { GoArrowUpRight } from "react-icons/go";
import ServiceCard from "../../ui/ServiceCard"
import Image from "next/image";
import { useGetServicesQuery } from "@/services/serviceApi";
import React from "react";

const Services = () => {
    const { data, isLoading } = useGetServicesQuery()

    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="container md:max-w-[1400px] mx-auto py-[40px] xl:py-[100px]">
            <div className="w-[86%] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-[30px]">
                    <div>
                        <span className="text-[#243ffa] text-[14px] sm:text-[15px] xl:text-[16px] tracking-[1px] uppercase">What We Provide</span>
                        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] xl:text-[34px] my-[15px] leading-8.5 text-[#030d43] font-semibold">Our Medical Services</h2>
                        <p className="text-[16px] lg:text-[17px] text-[#757887]">Molestiae non recusandae earum rerum hic tenetur asa piente delectus.</p>
                    </div>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="p-[25px] bg-[#fff] shadow-[2px_2px_52px_6px_rgb(36,63,250,0.04)] hover:shadow-[2px_2px_52px_6px_rgb(36,63,250,0.1)] hover:border-[#243ffa] border-[1px] border-transparent rounded-[10px]">
                            <div className="mb-[21px] h-[59px] md:h-[73px]"></div>
                            <h2 className="text-[20px] lg:text-[22px] mb-2.5 font-semibold">Loading...</h2>
                            <p className="mb-[15px] text-[16px] lg:text-[17px] text-[#757887]"></p>
                        </div>
                    ))}
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 sm:pl-[37px] items-center flex flex-col-reverse sm:grid sm:grid-cols-[50%_47%] rounded-[10px] bg-[#0f2349] overflow-hidden">
                        <div className="text-center sm:text-left mb-[40px] sm:mb-0">
                            <h3 className="text-[21px] md:text-[23px] text-white mb-[5px] font-semibold">We Provide Best Medical Treatment.</h3>
                        </div>
                        <div className="w-[252px] h-[252px] sm:w-[292px] sm:h-[292px] md:w-[302px] md:h-[322px] my-[30px] sm:my-0"></div>
                    </div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="container md:max-w-[1400px] mx-auto py-[40px] xl:py-[100px]">
            <div className="w-[86%] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-[30px]">
                    <div>
                        <span className="text-[#243ffa] text-[14px] sm:text-[15px] xl:text-[16px] tracking-[1px] uppercase">What We Provide</span>
                        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] xl:text-[34px] my-[15px] leading-8.5 text-[#030d43] font-semibold">Our Medical Services</h2>
                        <p className="text-[16px] lg:text-[17px] text-[#757887]">Molestiae non recusandae earum rerum hic tenetur asa piente delectus.</p>
                    </div>

                    {!isLoading && data && data.slice(0, 5).map(item => (
                        <ServiceCard key={item.id} {...item} />
                    ))}

                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 sm:pl-[37px] items-center flex flex-col-reverse sm:grid sm:grid-cols-[50%_47%] rounded-[10px] bg-[#0f2349] overflow-hidden">
                        <div className="text-center sm:text-left mb-[40px] sm:mb-0">
                            <h3 className="text-[21px] md:text-[23px] text-white mb-[5px] font-semibold">We Provide Best Medical Treatment.</h3>
                            <p className="text-[15px] mb-[14px] text-[#c5ccd8]">Reprehenderit involuta zesse.</p>
                            <div className="flex text-white items-center justify-center sm:justify-start text-[15px] md:text-[16px] gap-2">
                                <Link href='' className="font-semibold transform transition duration-700 hover:-translate-y-2">Book Appointment</Link>
                                <Link href='' className="bg-[#007bff] p-2 rounded-full transform transition duration-700 hover:-translate-y-2">
                                    <GoArrowUpRight />
                                </Link>
                            </div>
                        </div>
                        <div className="w-[252px] h-[252px] sm:w-[292px] sm:h-[292px] md:w-[302px] md:h-[322px] my-[30px] sm:my-0">
                            <Image
                                src="/images/treatment-img.jpg"
                                alt="treatment"
                                width={302}
                                height={322}
                                className="h-[252px] w-[252px] sm:w-[292px] sm:h-[292px] md:w-[302px] object-cover md:h-[322px] rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services