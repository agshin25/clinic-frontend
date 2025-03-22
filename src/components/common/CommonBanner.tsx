import Link from "next/link"

interface CommonBannerProps {
    title: string,
    text: string
}

const CommonBanner: React.FC<CommonBannerProps> = ({title, text}) => {
    return (
        <div className="h-full relative  z-20 flex flex-col items-center inset-0 lg:top-[120px] pb-[50px] sm:pb-[80px] md:pb-[100px] lg:pb-[300px] text-white">
            <h1 className="text-[32px] sm:text-[50px] md:text-[60px] lg:text-[74px]  font-bold mb-[17px] leading-[65px]">{title}</h1>
            <p
                className="text-[14px] md:text-[16px] lg:text-[20px] leading-[24px] lg:leading-[33px] mb-[18px] lg:mb-[35px] text-center"
                dangerouslySetInnerHTML={{ __html: text }}
            />            
            <ol className="py-[11px] px-[25px] lg:py-[13px] lg:px-[35px] text-[16px] lg:text-[18px] bg-[#030d4366] rounded-[10px] flex gap-4">
                <li>
                    <Link className="hover:underline" href='/'>Home</Link>
                </li>
                <li>-</li>
                <li>
                    {title}
                </li>
            </ol>
        </div>
    )
}

export default CommonBanner