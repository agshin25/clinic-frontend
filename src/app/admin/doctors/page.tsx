'use client'
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DoctorsTableActions } from "@/components/sections/admin/doctors-table-actions"
import { useGetDoctorsQuery } from "@/services/doctorApi"


export default function DoctorsPage() {
    const {data: doctors} = useGetDoctorsQuery()
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Doctors</h1>
                    <p className="text-muted-foreground">Manage your clinic's doctors and specialists.</p>
                </div>
                <Link href="/admin/doctors/new" passHref>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Doctor
                    </Button>
                </Link>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead className="w-[100px]">Photo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Surname</TableHead>
                            <TableHead className="hidden md:table-cell">Specialty</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctors?.map((doctor) => (
                            <TableRow key={doctor.id}>
                                <TableCell className="font-medium">{doctor.id}</TableCell>
                                <TableCell>
                                    <Image
                                        src={doctor.profileImage?.imageUrl || "/placeholder.svg"}
                                        alt={doctor.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{doctor.name}</TableCell>
                                <TableCell className="font-medium">{doctor.surname}</TableCell>
                                <TableCell className="hidden md:table-cell">{doctor.specialty}</TableCell>
                                <TableCell className="text-right">
                                    <DoctorsTableActions doctor={doctor} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

