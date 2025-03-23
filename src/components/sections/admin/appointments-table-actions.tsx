"use client"

import { useState } from "react"
import { MoreHorizontal, Trash2, Eye, Calendar, CheckCircle, XCircle, User, Mail, Phone, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteAppointmentMutation } from "@/services/appointmentApi"

interface AppointmentsTableActionsProps {
    appointment: {
        id: number
        name: string
        email: string
        phone: string
        date: string
        message: string
    }
}

export function AppointmentsTableActions({ appointment }: AppointmentsTableActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)
    const [deleteAppointment] = useDeleteAppointmentMutation()

    const handleDelete = async () => {
        try {
            await deleteAppointment(appointment.id).unwrap()
            alert(`Deleting appointment with ID: ${appointment.id}`)
            setShowDeleteDialog(false)
        } catch (error) {
            alert(`Error deleting appointment`)
        }

    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowDetailsDialog(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this appointment. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Appointment Details</DialogTitle>
                        <DialogDescription>View the complete details for this appointment.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Patient:</div>
                            <div className="col-span-3 flex items-center">
                                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                {appointment.name}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Email:</div>
                            <div className="col-span-3 flex items-center">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                {appointment.email}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Phone:</div>
                            <div className="col-span-3 flex items-center">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                {appointment.phone}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Date:</div>
                            <div className="col-span-3 flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                {new Date(appointment.date).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <div className="font-medium">Message:</div>
                            <div className="col-span-3">{appointment.message}</div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

