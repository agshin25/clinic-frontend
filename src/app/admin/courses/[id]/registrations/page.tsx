"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, Loader2, Mail, Phone, User, Calendar, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { RegistrationsTableActions } from "@/components/sections/admin/registrations-table-actions"
import { useCourseRegistrationsQuery } from "@/services/courseApi"

export default function CourseRegistrationsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [course, setCourse] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredRegistrations, setFilteredRegistrations] = useState<any[]>([])
    const unwrappedParams = use(params)
    const { data: courseData } = useCourseRegistrationsQuery(+unwrappedParams.id)
    

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setIsLoading(true)
                setCourse(courseData)
                setFilteredRegistrations(courseData?.registrations || [])
            } catch (err) {
                alert(`Error loading course: ${err}`)
                setError("Failed to load course. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        if (courseData) {
            loadCourse()
        }
    }, [courseData])

    useEffect(() => {
        if (course) {
            if (searchQuery.trim() === "") {
                setFilteredRegistrations(course.registrations)
            } else {
                const query = searchQuery.toLowerCase()
                const filtered = course.registrations.filter(
                    (reg: any) =>
                        reg.fullName.toLowerCase().includes(query) ||
                        reg.email.toLowerCase().includes(query) ||
                        reg.phone.includes(query) ||
                        (reg.notes && reg.notes.toLowerCase().includes(query)),
                )
                setFilteredRegistrations(filtered)
            }
        }
    }, [searchQuery, course])

    const handleExportCSV = () => {
        if (!course || !course.registrations.length) return

        const headers = ["Full Name", "Email", "Phone", "Notes", "Registration Date"]
        const rows = course.registrations.map((reg: any) => [
            reg.fullName,
            reg.email,
            reg.phone,
            reg.notes || "",
            new Date(reg.createdAt).toLocaleDateString(),
        ])

        const csvContent = [headers.join(","), ...rows.map((row: any) => row.join(","))].join("\n")
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `${course.title.replace(/\s+/g, "-")}-registrations.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error || !course) {
        return (
            <div className="space-y-6">
                <div className="flex items-center">
                    <Link href="/admin/courses" passHref>
                        <Button variant="ghost" size="sm" className="gap-1">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>

                <Card className="p-6">
                    <div className="text-center text-destructive">
                        <p>{error || "Course not found"}</p>
                        <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/courses")}>
                            Return to Courses
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <Link href="/admin/courses" passHref>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Courses
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">{course.title} - Registrations</h1>
                <p className="text-muted-foreground">Manage registrations for this course.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{course.registrations.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Course Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${course.price}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(course.price * course.registrations.length).toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search registrations..."
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-9 w-9 p-0"
                            onClick={() => setSearchQuery("")}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Clear search</span>
                        </Button>
                    )}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={handleExportCSV}
                    disabled={!course.registrations.length}
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            <Card>
                {filteredRegistrations.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Contact</TableHead>
                                <TableHead className="hidden md:table-cell">Registration Date</TableHead>
                                <TableHead className="hidden md:table-cell">Notes</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRegistrations.map((registration) => (
                                <TableRow key={registration.id}>
                                    <TableCell>
                                        <div className="font-medium">{registration.fullName}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex flex-col">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Mail className="mr-1 h-3 w-3" />
                                                {registration.email}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Phone className="mr-1 h-3 w-3" />
                                                {registration.phone}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center">
                                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                            {new Date(registration.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {registration.notes ? (
                                            registration.notes.length > 30 ? (
                                                `${registration.notes.substring(0, 30)}...`
                                            ) : (
                                                registration.notes
                                            )
                                        ) : (
                                            <span className="text-muted-foreground italic">No notes</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <RegistrationsTableActions registration={registration} courseId={course.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="rounded-full bg-muted p-3">
                            <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No registrations found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {searchQuery
                                ? "No registrations match your search criteria."
                                : "This course doesn't have any registrations yet."}
                        </p>
                        {searchQuery && (
                            <Button variant="outline" size="sm" className="mt-4" onClick={() => setSearchQuery("")}>
                                Clear search
                            </Button>
                        )}
                    </div>
                )}
            </Card>
        </div>
    )
}
