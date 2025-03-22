import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
import { Course } from '@/interfaces/course';

const CourseCard: React.FC<Course> = ({images, title, description, id, }) => {
    console.log(images);
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full lg:min-h-[420px]">
            <div className="relative h-48 w-full">
                <Image
                    src={images.length > 0 ? images[0].imageUrl : "/images/category-img5.jpg"}
                    alt="Cardiology Course"
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover"
                    priority
                />
                <div className="absolute bottom-0 left-6 transform translate-y-1/2 bg-[#243ffa] rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <Image
                        src="/images/category-icon5.jpg"
                        alt="Heart icon"
                        width={24}
                        height={24}
                        className="text-white"
                    />
                </div>
            </div>

            <div className="p-6 pt-8 space-y-2">
                <h3 className="text-xl font-bold text-[#030d43] xl:w-[80%]">{title}</h3>
                <p className="text-sm text-[#757887] line-clamp-3">{description}</p>

                <div className="pt-2">
                    <Link href={`/courses/${id}`} className="inline-flex items-center text-[#243ffa] font-medium hover:text-indigo-800">
                        Read more <FaArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;