import Image from "next/image";
import "@/styles/globals.css";
import Nav from "../../ui/Nav";
import Banner from "./Banner";

const Header = () => {
    return (
        <header className="bg-blue-600 xl:min-h-screen relative overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/graphic-img.png"
                    alt="Background graphic"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    quality={80}
                    priority
                />
            </div>


            <div className="absolute top-0 right-0">
                <Image
                    src="/images/double-shape-img2.png"
                    alt="Double Shape"
                    width={45}
                    height={45}
                    loading="lazy"
                />
            </div>


            <div className="absolute bottom-0 left-10 hidden sm:block">
                <Image
                    src="/images/box-shape-img1.png"
                    alt="Box Shape"
                    width={193}
                    height={107}
                    sizes="(max-width: 1024px) 93px, 193px"
                    className="w-auto h-auto max-w-[93px] max-h-[52px] lg:max-w-[193px] lg:max-h-[107px]"
                    loading="lazy"
                />
            </div>

            <div className="absolute bottom-0 right-10 hidden sm:block">
                <Image
                    src="/images/counter-sec-left-img.png"
                    alt="Counter Section Left"
                    width={96}
                    height={114}
                    sizes="(max-width: 1024px) 50px, 96px"
                    className="w-auto h-auto max-w-[50px] max-h-[65px] lg:max-w-[96px] lg:max-h-[114px]"
                    loading="lazy"
                />
            </div>

            <div className="relative z-10">
                <Nav />
                <Banner />
            </div>
        </header>
    );
};

export default Header;