"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaCalendarAlt, FaTwitter, FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import Writer from './Writer';
import { useGetBlogByIdQuery } from '@/services/blogApi';
import { useParams } from 'next/navigation';

const BlogDetail = () => {
    const params = useParams()
    const {data} = useGetBlogByIdQuery(+params.id!)
    

    return (
        <div className="container lg:max-w-[1400px] mx-auto px-4 py-8">
            <div className='w-[86%] mx-auto'>
                <h1 className="text-center text-3xl font-bold mb-6">BLOQ</h1>


                <div className="relative w-full h-[400px] mb-6 overflow-hidden rounded-lg">
                    <Image
                        src={data? data.images[0].imageUrl : "/images/singleblog-image1.jpg"}
                        alt="Man in yellow sweater working on laptop in office"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-[#030d43] mb-3">
                       {data?.title}
                    </h2>

                    <div className="flex items-center space-x-6 text-sm text-[#757887]">
                        <div className="flex items-center">
                            <FaUser className="text-[#243ffa] mr-2" />
                            <span>By: Admin</span>
                        </div>

                        <div className="flex items-center">
                            <FaCalendarAlt className="text-[#243ffa] mr-2" />
                            <span>{data?.createdAt}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 text-[#757887] mb-8">
                    <p>
                       {data?.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-gray-200">
                    {/* Tags */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-medium mb-2">Related Tags</h3>
                        <div className="flex space-x-2">
                            <Link href="#" className="px-3 py-1 bg-[#243ffa] text-white text-sm rounded-full">
                                Assistant
                            </Link>
                            <Link href="#" className="px-3 py-1 bg-[#243ffa] text-white text-sm rounded-full">
                                Advice
                            </Link>
                            <Link href="#" className="px-3 py-1 bg-[#243ffa] text-white text-sm rounded-full">
                                Virtual
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-2">Social Share</h3>
                        <div className="flex space-x-2">
                            <Link href="#" className="w-8 h-8 flex items-center justify-center bg-[#243ffa] text-white rounded-full">
                                <FaTwitter />
                            </Link>
                            <Link href="#" className="w-8 h-8 flex items-center justify-center bg-[#243ffa] text-white rounded-full">
                                <FaFacebookF />
                            </Link>
                            <Link href="#" className="w-8 h-8 flex items-center justify-center bg-[#243ffa] text-white rounded-full">
                                <FaLinkedinIn />
                            </Link>
                            <Link href="#" className="w-8 h-8 flex items-center justify-center bg-[#243ffa] text-white rounded-full">
                                <FaPinterestP />
                            </Link>
                        </div>
                    </div>
                </div>
                <Writer key={data?.id} {...data?.author!} />
            </div>
           
        </div>
    );
};

export default BlogDetail;