"use client"
import { Calendar, Clock, Mail, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AppointmentsTableActions } from "@/components/sections/admin/appointments-table-actions"
import { useGetAppointmentsQuery } from "@/services/appointmentApi"

export default function AppointmentsPage() {
    const { data: appointments = [] } = useGetAppointmentsQuery()

    const today = new Date()
    today.setHours(0, 0, 0, 0) 
    const pastCount = appointments.filter(app => new Date(app.date) < today).length
    const upcomingCount = appointments.filter(app => new Date(app.date) >= today).length

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
                <p className="text-muted-foreground">View and manage patient appointments.</p>
            </div>

            <div className="flex flex-wrap gap-4">
                <Card className="p-4 flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <div className="text-sm font-medium">Past</div>
                        <div className="text-2xl font-bold">{pastCount}</div>
                    </div>
                </Card>

                <Card className="p-4 flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <div className="text-sm font-medium">Upcoming</div>
                        <div className="text-2xl font-bold">{upcomingCount}</div>
                    </div>
                </Card>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient</TableHead>
                            <TableHead className="hidden md:table-cell">Contact</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead className="hidden md:table-cell">Message</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.map((appointment) => {
                            const appointmentDate = new Date(appointment.date)
                            const isToday = appointmentDate.toDateString() === today.toDateString()
                            const isPast = appointmentDate < today

                            return (
                                <TableRow key={appointment.id}>
                                    <TableCell>
                                        <div className="font-medium">{appointment.name}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex flex-col">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Mail className="mr-1 h-3 w-3" />
                                                {appointment.email}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Phone className="mr-1 h-3 w-3" />
                                                {appointment.phone}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                                {appointmentDate.toLocaleDateString()}
                                            </div>
                                            {isToday && <Badge className="mt-1 w-fit">Today</Badge>}
                                            {isPast && (
                                                <Badge variant="secondary" className="mt-1 w-fit">
                                                    Past
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {appointment.message.length > 30
                                            ? `${appointment.message.substring(0, 30)}...`
                                            : appointment.message}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <AppointmentsTableActions appointment={appointment} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
