import Image from "next/image";
import Nav from "../ui/Nav"
import CommonBanner from "./CommonBanner";

interface CommonHeaderProps {
    url: string;
    bannerProps: {
        title: string;
        text: string;
    };
}

const CommonHeader: React.FC<CommonHeaderProps> = ({url, bannerProps}) => {
   
    
    return (
        <header 
            style={{ backgroundImage: `url(${url})` }}
            className={`relative bg-cover bg-no-repeat  before:content-[''] before:w-full before:opacity-80 before:absolute before:z-10 before:h-full before:bg-[#243ffa]`}>
            <Nav />
            <Image 
                className="absolute w-[45px] h-[45px] z-20 top-0 right-0" 
                src="/images/double-shape-img2.png" 
                alt="double-shape"
                height={45}
                width={45}
                />
            <Image 
                className="hidden sm:block absolute w-[93px] h-[52px] lg:w-[193px] lg:h-[107px] bottom-0 z-20 left-10" 
                src="/images/box-shape-img1.png"
                alt="box-shape Midwell hero page"
                sizes="100%"
                quality={80}
                priority
                width={193}
                height={107}
                />
            <CommonBanner {...bannerProps} />
        </header>
    )
}

export default CommonHeader