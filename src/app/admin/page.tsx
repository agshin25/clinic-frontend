import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, UserRound, GraduationCap, HeartPulse, TrendingUp } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to your clinic administration dashboard.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+1 from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Course Registrations</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">36</div>
                        <p className="text-xs text-muted-foreground">+8 from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42</div>
                        <p className="text-xs text-muted-foreground">+12 from last week</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="mr-4 rounded-full bg-primary/10 p-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">New Appointment</p>
                                    <p className="text-xs text-muted-foreground">
                                        John Doe scheduled an appointment for tomorrow at 2:00 PM
                                    </p>
                                </div>
                                <div className="text-xs text-muted-foreground">2h ago</div>
                            </div>

                            <div className="flex items-center">
                                <div className="mr-4 rounded-full bg-primary/10 p-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">Blog Published</p>
                                    <p className="text-xs text-muted-foreground">"10 Tips for Dental Health" was published</p>
                                </div>
                                <div className="text-xs text-muted-foreground">5h ago</div>
                            </div>

                            <div className="flex items-center">
                                <div className="mr-4 rounded-full bg-primary/10 p-2">
                                    <GraduationCap className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">Course Registration</p>
                                    <p className="text-xs text-muted-foreground">3 new registrations for "Advanced Dental Care" course</p>
                                </div>
                                <div className="text-xs text-muted-foreground">1d ago</div>
                            </div>

                            <div className="flex items-center">
                                <div className="mr-4 rounded-full bg-primary/10 p-2">
                                    <UserRound className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">New Doctor</p>
                                    <p className="text-xs text-muted-foreground">Dr. Sarah Johnson joined the clinic</p>
                                </div>
                                <div className="text-xs text-muted-foreground">2d ago</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Monthly Statistics</CardTitle>
                        <CardDescription>Overview of clinic performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <HeartPulse className="mr-2 h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Services Booked</span>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                    <span className="text-sm">128</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <GraduationCap className="mr-2 h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Course Revenue</span>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                    <span className="text-sm">$4,280</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Appointment Rate</span>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                    <span className="text-sm">92%</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Blog Engagement</span>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                    <span className="text-sm">+24%</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

