"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import DoctorCard from "@/components/ui/DoctorCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetDoctorsQuery } from "@/services/doctorApi";

const Team = () => {
    const {data: doctors} = useGetDoctorsQuery()
    return (
        <section className="py-[130px]">
            <div className="container  md:max-w-[1400px] mx-auto">
                <div className="w-[86%] mx-auto">
                    <div className="flex flex-col justify-center items-center mb-[53px]">
                        <span className="text-14px sm:text-[15px] md:text-[16px] text-[#243ffa] leading-[16px] tracking-[1px] pb-[10px]">
                            OUR TEAM
                        </span>
                        <h2 className="text-[24px] sm:text-[28px] md:text-[32] lg:text-[34px] xl:text-[38px] leading-[42px] text-[#030d43] text-center md:text-left font-semibold">
                            Meet Our Professional Team
                        </h2>
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        navigation
                        pagination={{ clickable: true }}
                        className="!pb-10"
                    >                
                        {doctors?.map((doctor) => (
                            <SwiperSlide key={doctor.id}>
                                <DoctorCard {...doctor} />
                            </SwiperSlide>
                        ))}
                      
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Team;
