import { Service } from "@/interfaces/service"
import Image from "next/image"
import Link from "next/link"

const ServiceCard: React.FC<Service> = ({ id, title, description, images }) => {
    return (
        <div className="p-[25px] bg-[#fff] shadow-[2px_2px_52px_6px_rgb(36,63,250,0.04)] hover:shadow-[2px_2px_52px_6px_rgb(36,63,250,0.1)] hover:border-[#243ffa] border-[1px] border-transparent rounded-[10px]">
            <div className="mb-[21px] h-[59px]  md:h-[73px]">
                <Image 
                    className="h-[59px] md:h-[73px]" 
                    src="/images/cardiologist-icon.png" 
                    alt="icon" 
                    height={73}
                    width={61}/>
            </div>
            <h2 className="text-[20px] lg:text-[22px] mb-2.5 font-semibold">{title}</h2>
            <p className="mb-[15px] text-[16px] lg:text-[17px] text-[#757887]">
                {description}
            </p>
            <Link href='/clinic_services' className="flex text-[15px] font-medium text-[#243ffa]">
                <span>Read More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    )
}

export default ServiceCard