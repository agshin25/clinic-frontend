import CommonHeader from "@/components/common/CommonHeader"
import CourseDetailPage from "@/components/sections/courses/CourseDetail";

const SingleCourse = () => {
    const url = '/images/sub-banner-bg-img.jpg'
    const bannerProps = {
        title: "Courses",
        text: "Duisss aute irure dolor in reprehenderit in voluptate velit essecillum <br /> dolore fugiat nulla pariatur",
    };
    return (
        <div>
            <CommonHeader url={url} bannerProps={bannerProps} />
            <main>
                <CourseDetailPage />
            </main>
        </div>
    )
}

export default SingleCourse