import Services2 from "@/components/sections/clinic_services/Services2"
import CommonHeader from "@/components/common/CommonHeader"


const ServicesPage = () => {
    const bgUrl = '/images/sub-banner-bg-img.jpg'

    const bannerProps = {
        title: "Services",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit essecillum <br /> dolore fugiat nulla pariatur"
    }
    return (
        <div>
            <CommonHeader url={bgUrl} bannerProps={bannerProps} />
            <main>
                <Services2 />
            </main>
        </div>
    )
}

export default ServicesPage