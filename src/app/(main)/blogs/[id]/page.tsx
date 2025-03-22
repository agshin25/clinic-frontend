import CommonHeader from "@/components/common/CommonHeader"
import BlogDetail from "@/components/sections/blogs/SingleBlog"

const SingleBlog = () => {
    const url = '/images/sub-banner-bg-img.jpg'
    const bannerProps = {
        title: "Blogs",
        text: "Duisss aute irure dolor in reprehenderit in voluptate velit essecillum <br /> dolore fugiat nulla pariatur",
    };
    return (
        <div>
            <CommonHeader url={url} bannerProps={bannerProps} />
            <main>
                <BlogDetail />
            </main>
        </div>
    )
}

export default SingleBlog