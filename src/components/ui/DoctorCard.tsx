import { Doctor } from "@/interfaces/doctor";
import Image from "next/image"
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";


const DoctorCard: React.FC<Doctor> = ({name, surname, specialty, profileImage}) => {
    return (
        <div>
            <div className="mb-[24px] flex justify-center">
                <Image className="rounded-full h-[254px] w-[254px]" src={profileImage? profileImage.imageUrl : "/images/team-img1.jpg"} height={"254"} alt="team1" width={254} />
            </div>
            <div className="flex flex-col items-center">
                <h4 className="text-[22px] mb-[5px] font-bold leading-[22px] text-[#030d43]">{name} {surname}</h4>
                <span className="mb-[16px] text-[18px] leading-[27px] text-[#757887] block">{specialty}</span>
                <div>
                    <ul className="flex text-white">
                        <li className="flex justify-center items-center h-[40px] w-[40px] rounded-full mx-[3px] bg-[#243ffa] border-[1px] border-transparent text-[16px] cursor-pointer hover:border-[#243ffa] hover:text-[#243ffa] hover:bg-transparent transform transition duration-700 hover:-translate-y-2">
                            <Link href=''>
                                <FaFacebookF />
                            </Link>
                        </li>
                        <li className="flex justify-center items-center h-[40px] w-[40px] rounded-full mx-[3px] bg-[#243ffa] border-[1px] border-transparent text-[16px] cursor-pointer hover:border-[#243ffa] hover:text-[#243ffa] hover:bg-transparent transform transition duration-700 hover:-translate-y-2">
                            <Link href=''>
                                <FaTwitter />
                            </Link>
                        </li>
                        <li className="flex justify-center items-center h-[40px] w-[40px] rounded-full mx-[3px] bg-[#243ffa] border-[1px] border-transparent text-[16px] cursor-pointer hover:border-[#243ffa] hover:text-[#243ffa] hover:bg-transparent transform transition duration-700 hover:-translate-y-2">
                            <Link href=''>
                                <FaLinkedinIn />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DoctorCard