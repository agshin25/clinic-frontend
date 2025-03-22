"use client"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ServicesTableActions } from "@/components/sections/admin/services-table-actions"
import { useGetServicesQuery } from "@/services/serviceApi"

// const services = [
//     {
//         id: 1,
//         title: "General Dentistry",
//         description: "Comprehensive dental care for the whole family, including check-ups, cleanings, and fillings.",
//         createdAt: "2023-05-10T09:30:00Z",
//         updatedAt: "2023-05-12T14:20:00Z",
//         images: [{ id: 1, imageUrl: "/placeholder.svg" }],
//     },
//     {
//         id: 2,
//         title: "Cosmetic Dentistry",
//         description: "Enhance your smile with our range of cosmetic treatments including whitening, veneers, and bonding.",
//         createdAt: "2023-05-15T11:45:00Z",
//         updatedAt: "2023-05-16T10:30:00Z",
//         images: [{ id: 2, imageUrl: "/placeholder.svg" }],
//     },
//     {
//         id: 3,
//         title: "Orthodontics",
//         description: "Straighten your teeth with our modern orthodontic treatments, including braces and clear aligners.",
//         createdAt: "2023-05-20T13:15:00Z",
//         updatedAt: "2023-05-21T09:45:00Z",
//         images: [{ id: 3, imageUrl: "/placeholder.svg" }],
//     },
//     {
//         id: 4,
//         title: "Pediatric Dentistry",
//         description: "Specialized dental care for children in a friendly and comfortable environment.",
//         createdAt: "2023-05-25T10:00:00Z",
//         updatedAt: "2023-05-26T15:30:00Z",
//         images: [{ id: 4, imageUrl: "/placeholder.svg" }],
//     },
//     {
//         id: 5,
//         title: "Dental Implants",
//         description: "Replace missing teeth with our state-of-the-art dental implant solutions.",
//         createdAt: "2023-05-30T14:20:00Z",
//         updatedAt: "2023-05-31T11:10:00Z",
//         images: [{ id: 5, imageUrl: "/placeholder.svg" }],
//     },
// ]

export default function ServicesPage() {
    const {data: services} = useGetServicesQuery()
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                    <p className="text-muted-foreground">Manage your clinic services and treatments.</p>
                </div>
                <Link href="/admin/services/new" passHref>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Service
                    </Button>
                </Link>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                            <TableHead className="hidden md:table-cell">Created</TableHead>
                            <TableHead className="hidden md:table-cell">Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services?.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell className="font-medium">{service.title}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {service.description.length > 60 ? `${service.description.substring(0, 60)}...` : service.description}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(service.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(service.updatedAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <ServicesTableActions service={service} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

