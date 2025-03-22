"use client"
import { useGetServicesQuery } from "@/services/serviceApi"
import Services2Card from "../../ui/Services2Card"


const Services2 = () => {
    const {data} = useGetServicesQuery()
    
    return (
        <div className="container md:max-w-[1400px] mx-auto py-[40px]">
            <div className="w-[86%] mx-auto">
                <div className="flex flex-col items-center">
                    <span className="text-[#243ffa] text-[14px] sm:text-[15px] xl:text-[16px] tracking-[1px] uppercase">What We Provide</span>
                    <h2 className="text-[24px] sm:text-[28px] md:text-[32px] xl:text-[34px] leading-8.5 text-[#030d43] font-semibold text-center">Our Medical Services</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-[30px]">
                    {data?.slice(0, 7).map((item) => (
                        <Services2Card key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services2