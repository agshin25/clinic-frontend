"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaClock, FaDollarSign, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useGetCourseByIdQuery, useRegisterCourseMutation } from '@/services/courseApi';

const CourseDetailPage = () => {
    const params = useParams();
    const { data: course } = useGetCourseByIdQuery(+params.id!);
    const [registerForCourse] = useRegisterCourseMutation();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        note: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() =>  {
        console.log(formData);
        
    }, [formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+994(50|70|55|77)\d{7}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(formData);
        
        e.preventDefault();
        if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
            alert("All fields except notes are required");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Invalid email format");
            return;
        }
        if (!validatePhone(formData.phone)) {
            alert("Phone number must start with +994 followed by 50, 70, 55, or 77 and 7 more digits");
            return;
        }
        try {
            await registerForCourse({id: Number(params.id), ...formData}).unwrap()
            setIsSubmitted(true);
        } catch (error) {
            console.log('Error during registration');
        }

        
    };

    return course && (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Link href="/courses" className="flex items-center text-indigo-600 mb-6 hover:underline">
                <FaArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative h-[300px] w-full">
                            <Image src={course.images[0].imageUrl} alt={course.title} fill className="object-cover" priority />
                        </div>
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-[#030d43] mb-4">{course.title}</h1>
                            <div className="flex flex-wrap gap-4 mb-6 text-[#757887]">
                                <div className="flex items-center"><FaClock className="mr-2 h-5 w-5" /> <span>{course.duration}</span></div>
                                <div className="flex items-center"><FaDollarSign className="mr-2 h-5 w-5" /> <span>${course.price}</span></div>
                                <div className="flex items-center"><FaCalendarAlt className="mr-2 h-5 w-5" /> <span>Starts: {course.createdAt}</span></div>
                            </div>
                            <h2 className="text-xl font-semibold mb-3">What You'll Learn</h2>
                            <p className="text-[#757887] mb-6">{course.description}</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6">Register for this Course</h2>
                    {isSubmitted ? (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <FaCheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Registration Successful!</h3>
                            <p className="text-gray-600 mb-4">Thank you for registering. We'll be in touch soon.</p>
                            <Link href={'/courses'} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-[#243ffa] transition" onClick={() => setIsSubmitted(false)}>
                                Register Another
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {['fullName', 'email', 'phone'].map((field) => (
                                <div key={field} className="mb-4">
                                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </label>
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        id={field}
                                        name={field}
                                        value={formData[field as keyof typeof formData]}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                                        placeholder={`Enter your ${field}`}
                                    />
                                </div>
                            ))}
                            <div className="mb-6">
                                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                                <textarea id="note" name="note" value={formData.note} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows={4} placeholder="Any additional information or questions?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium">
                                Register Now
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
