import CommonHeader from "@/components/common/CommonHeader"
import Team from "@/components/sections/main/Team"


const DoctorsPage = () => {
    const bgUrl = '/images/sub-banner-bg-img.jpg'

    const bannerProps = {
        title: "Doctors",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit essecillum <br /> dolore fugiat nulla pariatur"
    }
    return (
        <div>
            <CommonHeader url={bgUrl} bannerProps={bannerProps} />
            <main>
                <Team />
            </main>
        </div>
    )
}

export default DoctorsPage