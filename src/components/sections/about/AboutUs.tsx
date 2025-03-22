import Image from 'next/image';
import React from 'react';

const AboutUs = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
                <div className="relative">
                    <Image
                        src="/images/about-doctor-img1.jpg"
                        alt="Doctors examining x-ray"
                        className="rounded-lg w-full h-auto"
                        height={490}
                        width={730}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-[#243ffa] font-semibold uppercase tracking-wider">Haqqımızda</h4>
                        <h2 className="text-2xl md:text-3xl lg::text-4xl font-bold text-[#030d43] leading-tight mt-2">
                            We Carefully Manage & Treat The Patients
                        </h2>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[#757887]">
                            Donec pulvinar tellus egetmagna aliquet ultricies. nec eleifend
                            sem convallis vitae soluta nobis est eligendi optio cumque nihil
                            impedit quo minus id quod maxime placeat facere.
                        </p>

                        <p className="text-[#757887]">
                            Donec pulvinar tellus egetmagna aliquet ultricies. nec eleifend
                            sem convallis vitae soluta nobis est eligendi optio cumque nihil
                            impedit quo minus id quod maxime placeat facere.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <p className="text-[16px] text-[#757887]">
                    Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                    only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                    including versions of Lorem ipsum.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;