import { AboutUsProps } from '@/interfaces/service';
import Image from 'next/image';
import React from 'react';

const AboutServices: React.FC<AboutUsProps> = ({ data }) => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
                <div className="relative">
                    <Image
                        src={data?.images[0]?.imageUrl || "/images/about-doctor-img1.jpg"}
                        alt={data?.title || "Doctors examining x-ray"}
                        className="rounded-lg w-full max-h-[400px] object-cover"
                        height={400}
                        width={730}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-[#243ffa] font-semibold uppercase tracking-wider">Xidmətlər</h4>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#030d43] leading-tight mt-2">
                            {data?.title || "We Carefully Manage & Treat The Patients"}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[#757887]">
                            {data?.description || "Default description goes here."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutServices;
