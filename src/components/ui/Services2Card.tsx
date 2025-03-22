import { Service } from "@/interfaces/service";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";



const Services2Card: React.FC<Service> = ({ id, title, description, images }) => {
    return (
        <div className="flex flex-col rounded-[10px] shadow-[2px_2px_52px_6px_rgb(36_63_250_/_4%)]">
            <figure className="rounded-t-[10px]">
                <Image
                    className="rounded-t-[10px] object-cover w-full h-[215px]"
                    src={images?.[0]?.imageUrl || "/images/default.jpg"}
                    width={225}
                    height={205}
                    quality={80}
                    priority
                    sizes="100%"
                    alt={title}
                />
            </figure>
            <div className="flex flex-col pt-[55px] pl-[28px] pb-[25px] relative">
                <figure className="bg-blue-600 w-[70px] h-[70px] rounded-full flex items-center justify-center absolute top-[-35px]">
                    <Image
                        src={"/images/category-icon1.jpg"}
                        height={44}
                        width={38}
                        alt="icon"
                    />
                </figure>
                <h4 className="mb-[13px] text-[22px] text-[#030d43] font-semibold">{title}</h4>
                <p className="text-[16px] mb-[16px] text-[#757887] leading-[27px]">
                    {description.length > 80 ? `${description.slice(0, 80)}...` : description}
                </p>
                <Link href={`/clinic_services/${id}`} className="flex items-center gap-3 font-medium text-[15px] text-[#243ffa] leading-[27px]">
                    Read more
                    <FaAngleRight />
                </Link>
            </div>
        </div>
    );
};

export default Services2Card;
