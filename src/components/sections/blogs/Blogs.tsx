"use client"

import { useGetBlogsQuery } from "@/services/blogApi"
import BlogCard from "../../ui/BlogCard"

const Blogs = () => {
    const {data: blogs} = useGetBlogsQuery()
    return (
        <div className="container md:max-w-[1400px] mx-auto py-[40px]">
            <div className="w-[92%] sm:w-[86%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 mx-auto gap-6">
                    {blogs?.map((blog) => (
                        <BlogCard key={blog.id} {...blog} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Blogs