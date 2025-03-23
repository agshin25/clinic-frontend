"use client"
import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useMakeAppointmentMutation } from "@/services/appointmentApi";

const Appointment = () => {
    const [date, setDate] = useState<Date | undefined>();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const [createAppointment, {isLoading}] = useMakeAppointmentMutation()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };
    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+994(50|70|55|77)\d{7}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date) {
            alert("Please select a date");
            return;
        }

        if (!validatePhone(formData.phone)) {
            alert("Phone number must start with +994 followed by 50, 70, 55, or 77 and 7 more digits");
            return;
        }

        const formattedDate = format(date, "yyyy-MM-dd");
        try {
            const result = await createAppointment({
                date: formattedDate,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                message: formData.message
            }).unwrap();

            alert("Appointment successfully created!");

            setDate(undefined);
            setFormData({
                name: "",
                phone: "",
                email: "",
                message: ""
            });
        } catch (error) {
            console.error("Failed to create appointment:", error);
            alert("Failed to create appointment. Please try again.");
        }

    };

    return (
        <section className="relative overflow-hidden before:content-[''] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-[#0f2349f2] w-full bg-[url('/images/form-bg-img2.jpg')] bg-no-repeat bg-cover bg-center">
            <div className="absolute w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[110px] xl:h-[100px] bg-no-repeat bg-contain bg-[url('/images/dots-lft-img.png')]"></div>
            <div className="w-full h-full relative before:content-[] before:w-[100px] before:h-[55px] before:lg:w-[120px] before:lg:h-[65px] before:xl:w-[190px] before:xl:h-[105px] before:2xl:w-[230px] before:2xl:h-[125px] before:bg-[url('/images/dots-rt-img.png')] before:bg-contain  before:absolute before:right-[80px] before:z-50 before:bottom-0  after:bg-no-repeat after:absolute after:w-[50%] after:content-[''] after:right-0 after:z-30 after:top-0  after:bg-cover after:h-full after:bg-[url('/images/form-bg-img.jpg')]">
                <div className="container md:max-w-[1400px] mx-auto relative z-40 after:absolute after:content-[''] after:-z-200 after:w-[427px] after:bg-contain after:left-[-145px] after:bottom-0 after:h-[380px] after:bg-[url('/images/shape-img.png')]">
                    <div className="w-[86%] py-[100px] mx-auto">
                        <div className="bg-[#243ffa] px-[25px] sm:px-[65px] py-[30px] sm:py-[45px] w-full md:w-[80%] lg:w-[60%] rounded-[10px]">
                            <span className="text-[15px] lg:text-[16px] tracking-[1px] leading-[16px] uppercase text-white block text-center sm:text-left">
                                Request a consultation
                            </span>
                            <h2 className="text-[24px] md:text-[28px] lg:text-[34px] xl:text-[38px] mb-[25px] lg:mb-[45px] text-white font-medium mt-[10px] leading-[42px] text-center sm:text-left">
                                Make an Appointment
                            </h2>
                            <form method="post" onSubmit={handleSubmit}>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-[23px] mb-[40px] gap-y-[20px]">
                                    <li className="border-b-[1px] border-[#ffffff4d]">
                                        <input onChange={handleChange} type="text" className="placeholder:text-[#d4dffb] text-white caret-white outline-0 pb-[10px] placeholder:md:text-[16px] placeholder:text-[15px]" name="name" value={formData.name} placeholder="Ad:" />
                                    </li>
                                    <li className="border-b-[1px] border-[#ffffff4d]">
                                        <input onChange={handleChange} type="text" className="placeholder:text-[#d4dffb] text-white caret-white outline-0 pb-[10px] placeholder:md:text-[16px] placeholder:text-[15px]" name='phone' value={formData.phone} placeholder="Telefon Nomresi:" />
                                    </li>
                                    <li className="border-b-[1px] border-[#ffffff4d]">
                                        <input onChange={handleChange} type="text" className="placeholder:text-[#d4dffb] text-white caret-white outline-0 pb-[10px] placeholder:md:text-[16px] placeholder:text-[15px]" name="email" value={formData.email} placeholder="Email:" />
                                    </li>
                                    <li className="border-b-[1px] border-[#ffffff4d] relative">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button type="button" className="text-left w-full placeholder:text-[#d4dffb] text-white caret-white outline-0 pb-[10px] placeholder:md:text-[16px] placeholder:text-[15px]">
                                                    {date ? format(date, "PPP") : "Tarix seçin..."}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-white rounded-md shadow-lg">
                                                <Calendar 
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    disabled={(date) => date < new Date()} 
                                                    />
                                            </PopoverContent>
                                        </Popover>
                                    </li>
                                    <li className="sm:col-span-2 border-b-[1px] border-[#ffffff4d]">
                                        <textarea onChange={handleChange} className="placeholder:text-[#d4dffb] caret-white text-white resize-none outline-0 pb-[10px] placeholder:md:text-[16px] placeholder:text-[15px]" name="message" value={formData.message} placeholder="Message"></textarea>
                                    </li>
                                </ul>
                                <div className="flex items-center text-[16px] md:text-[18px] gap-[18px] w-[285px] text-white cursor-pointer transform transition duration-700 hover:-translate-y-2 group">
                                    <button  className="font-semibold cursor-pointer" type="submit">
                                        Book an Appointment
                                    </button>
                                    <button className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] lg:w-[65px] lg:h-[65px] rounded-full border-[1px] flex justify-center items-center text-2xl md:text-3xl group-hover:text-[#243ffa] group-hover:bg-white transition-all duration-700" type="submit">
                                        <GoArrowUpRight />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appointment;
