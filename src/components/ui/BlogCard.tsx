import { Blog } from '@/interfaces/blog';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaTag, FaCalendarAlt } from 'react-icons/fa';

const BlogCard: React.FC<Blog> = ({id, title, images, createdAt }) => {
    return (
        <div className="blog-box bg-white  shadow mb-8 overflow-hidden">
            <div>
                <figure className="w-full">
                    <Image
                        src={images ? images[0]?.imageUrl : "/images/standard_post_img01.jpg"}
                        alt="Professional woman in white shirt sitting at desk"
                        className="w-full min-h-[260px]"
                        height={247}
                        width={350}
                        objectFit="cover"
                    />
                </figure>

                <div className="lower-portion px-[30px] py-[26px] border-b border-[#243ffa]">
                    <div className="flex items-center space-x-5 mb-4 lg:mb-7">
                        <div className="flex items-center text-mr">
                            <FaUser className="text-[#243ffa] mr-2  lg:text-lg" />
                            <span className="text-[#757887] text-[15px]">By : Admin</span>
                        </div>

                        <div className="flex items-center">
                            <FaTag className="text-[#243ffa] mr-2 lg:text-lg" />
                            <span className="text-[#757887] text-[15px]">Virtual Assistant</span>
                        </div>
                    </div>

                    <Link href="#" className="block">
                        <h5 className="text-[16px] md:text-[18px] lg:text-[22px] text-[#757887] leading-[30px] font-medium hover:text-[#243ffa] transition-colors">
                            {title}
                        </h5>
                    </Link>
                </div>

                <div className="button-portion flex items-center relative justify-between px-[20px] md:px-[30px] py-[20px] md:py-[30px]">
                    <div className="date flex items-center">
                        <FaCalendarAlt className="text-[#243ffa] mr-2 text-[18px] md:text-[22px]" />
                        <span className="text-[#757887] text-[15px]">{createdAt}</span>
                    </div>

                    <div className="button absolute right-0">
                        <Link href={`blogs/${id}`} className="read_more bg-[#243ffa] hover:bg-white hover:text-[#243ffa] hover:border-[#243ffa] border border-transparent text-white px-4 md:px-6 py-[8px] md:py-[14px] rounded-l-full text-[12px] md:text-[15px] transition-all">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;