import AboutUs from "@/components/sections/about/AboutUs"
import CommonHeader from "@/components/common/CommonHeader"


const AboutPage = () => {
    const bgUrl = '/images/sub-banner-bg-img.jpg'

    const bannerProps = {
        title: "About Us",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit essecillum <br /> dolore fugiat nulla pariatur"
    }
    return (
        <div>
            <CommonHeader url={bgUrl} bannerProps={bannerProps} />
            <main>
                <AboutUs />
            </main>
        </div>
    )
}

export default AboutPage