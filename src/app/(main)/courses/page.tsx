import CommonHeader from "@/components/common/CommonHeader"
import Courses from "@/components/sections/courses/Courses"


const CoursesPage = () => {
    const bgUrl = '/images/sub-banner-bg-img.jpg'

    const bannerProps = {
        title: "Courses",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit essecillum <br /> dolore fugiat nulla pariatur"
    }
    return (
        <div>
            <CommonHeader url={bgUrl} bannerProps={bannerProps} />
            <main>
                <Courses />
            </main>
        </div>
    )
}

export default CoursesPage