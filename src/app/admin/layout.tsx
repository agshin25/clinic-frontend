"use client"
import type { ReactNode } from "react"
import Link from "next/link"
import {
    Calendar,
    FileText,
    ImageIcon,
    LayoutDashboard,
    UserRound,
    GraduationCap,
    HeartPulse,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import useAuth from "@/components/utils/useAuth"

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    useAuth()
    
    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <Link href="/admin" className="flex items-center font-bold">
                        <HeartPulse className="mr-2 h-6 w-6" />
                        <span>Clinic Admin</span>
                    </Link>
                    <div className="ml-auto flex items-center space-x-4">
                        <Button variant="outline" size="sm">
                            <UserRound className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex">
                <aside className="w-64 border-r bg-muted/40">
                    <ScrollArea className="h-full py-4">
                        <nav className="grid gap-1 px-2">
                            <Link href="/admin" passHref>
                                <Button variant="ghost" className="w-full justify-start">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/admin/blogs" passHref>
                                <Button variant="ghost" className="w-full justify-start">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Blogs
                                </Button>
                            </Link>
                            <Link href="/admin/doctors" passHref>
                                <Button variant="ghost" className="w-full justify-start">
                                    <UserRound className="mr-2 h-4 w-4" />
                                    Doctors
                                </Button>
                            </Link>
                            <Link href="/admin/courses" passHref>
                                <Button variant="ghost" className="w-full justify-start">
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    Courses
                                </Button>
                            </Link>
                            <Link href="/admin/services" passHref>
                                <Button variant="ghost" className="w-full justify-start">
                                    <HeartPulse className="mr-2 h-4 w-4" />
                                    Services
                                </Button>
                            </Link>
                            <Link href="/admin/images" passHref>
                                <Button variant="ghost" className="w-full justify-start">
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    Images
                                </Button>
                            </Link>
                            <Link href="/admin/appointments" passHref>
                                <Button variant="ghost" className="w-full justify-start">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Appointments
                                </Button>
                            </Link>
                        </nav>
                    </ScrollArea>
                </aside>
                <main className="flex-1 overflow-auto">
                    <div className="container p-6">{children}</div>
                </main>
            </div>
        </div>
    )
}

