import CommonHeader from "@/components/common/CommonHeader"
import Blogs from "@/components/sections/blogs/Blogs"

const BlogPage = () => {
    const url = '/images/sub-banner-bg-img.jpg'
    const bannerProps = {
        title: "Blogs",
        text: "Duisss aute irure dolor in reprehenderit in voluptate velit essecillum <br /> dolore fugiat nulla pariatur",
    };
    return (
        <div>
            <CommonHeader url={url} bannerProps={bannerProps} />
            <main>
                <Blogs />
            </main>
        </div>
    )
}

export default BlogPage