"use client"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CoursesTableActions } from "@/components/sections/admin/courses-table-actions"
import { useGetCoursesQuery } from "@/services/courseApi"

// Mock data - would be replaced with actual data fetching
// const courses = [
//     {
//         id: 1,
//         title: "Advanced Dental Hygiene",
//         description: "Learn advanced techniques for maintaining optimal dental health.",
//         duration: "4 weeks",
//         price: 299.99,
//         isActive: true,
//         createdAt: "2023-05-05T10:30:00Z",
//         updatedAt: "2023-05-06T14:20:00Z",
//         images: [{ id: 1, imageUrl: "/placeholder.svg" }],
//     },
//     {
//         id: 2,
//         title: "Dental Assistant Training",
//         description: "Comprehensive training program for aspiring dental assistants.",
//         duration: "12 weeks",
//         price: 899.99,
//         isActive: true,
//         createdAt: "2023-05-10T09:15:00Z",
//         updatedAt: "2023-05-11T11:45:00Z",
//         images: [{ id: 2, imageUrl: "/placeholder.svg" }],
//     },
//     {
//         id: 3,
//         title: "Pediatric Dental Care",
//         description: "Specialized course on dental care for children.",
//         duration: "6 weeks",
//         price: 499.99,
//         isActive: false,
//         createdAt: "2023-05-15T13:20:00Z",
//         updatedAt: "2023-05-16T10:10:00Z",
//         images: [{ id: 3, imageUrl: "/placeholder.svg" }],
//     },
//     {
//         id: 4,
//         title: "Dental Practice Management",
//         description: "Learn how to efficiently manage a dental practice.",
//         duration: "8 weeks",
//         price: 699.99,
//         isActive: true,
//         createdAt: "2023-05-20T15:40:00Z",
//         updatedAt: "2023-05-21T09:30:00Z",
//         images: [{ id: 4, imageUrl: "/placeholder.svg" }],
//     },
//     {
//         id: 5,
//         title: "Dental Radiology",
//         description: "Comprehensive training in dental radiographic techniques.",
//         duration: "10 weeks",
//         price: 799.99,
//         isActive: true,
//         createdAt: "2023-05-25T11:30:00Z",
//         updatedAt: "2023-05-26T14:15:00Z",
//         images: [{ id: 5, imageUrl: "/placeholder.svg" }],
//     },
// ]

export default function CoursesPage() {
    const {data: courses} = useGetCoursesQuery()
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                    <p className="text-muted-foreground">Manage your educational courses and programs.</p>
                </div>
                <Link href="/admin/courses/new" passHref>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Course
                    </Button>
                </Link>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden md:table-cell">Duration</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses?.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.title}</TableCell>
                                <TableCell className="hidden md:table-cell">{course.duration}</TableCell>
                                <TableCell>${+course.price}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge variant={course.isActive ? "default" : "secondary"}>
                                        {course.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <CoursesTableActions course={course} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

