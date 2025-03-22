'use client'
import CommonHeader from "@/components/common/CommonHeader"
import AboutServices from "@/components/sections/about/AboutServices"
import { useGetOneServiceQuery } from "@/services/serviceApi"
import { use } from "react"

const Detail = ({params}: {params: Promise<{id: string}>}) => {
    const bgUrl = '/images/sub-banner-bg-img.jpg'
    const unwrappedParams = use(params)
    const {data} = useGetOneServiceQuery(+unwrappedParams.id)

    const bannerProps = {
        title: "Services",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit essecillum <br /> dolore fugiat nulla pariatur"
    }
    return (
        <div>
            <CommonHeader url={bgUrl} bannerProps={bannerProps} />
            <main>
                <AboutServices data={data} />
            </main>
        </div>
    )
} 

export default Detail