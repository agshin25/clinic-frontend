"use client"

import { useState } from "react"
import { MoreHorizontal, Trash2, Eye, Mail, Phone } from "lucide-react"

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

interface RegistrationsTableActionsProps {
    registration: {
        id: number
        fullName: string
        email: string
        phone: string
        notes: string | null
        createdAt: string
    }
    courseId: number
}

export function RegistrationsTableActions({ registration, courseId }: RegistrationsTableActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)

    const handleDelete = async () => {
        console.log(`Deleting registration with ID: ${registration.id} from course ${courseId}`)
        setShowDeleteDialog(false)
    }

    const handleSendEmail = () => {
        window.open(`mailto:${registration.email}?subject=Regarding your course registration`)
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
                    <DropdownMenuItem onClick={handleSendEmail}>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Send Email</span>
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
                            This will permanently delete {registration.fullName}'s registration. This action cannot be undone.
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
                        <DialogTitle>Registration Details</DialogTitle>
                        <DialogDescription>Complete information about this course registration.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Name:</div>
                            <div className="col-span-3">{registration.fullName}</div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Email:</div>
                            <div className="col-span-3 flex items-center">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                <a href={`mailto:${registration.email}`} className="hover:underline">
                                    {registration.email}
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Phone:</div>
                            <div className="col-span-3 flex items-center">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                <a href={`tel:${registration.phone}`} className="hover:underline">
                                    {registration.phone}
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Registered:</div>
                            <div className="col-span-3">{new Date(registration.createdAt).toLocaleString()}</div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <div className="font-medium">Notes:</div>
                            <div className="col-span-3">
                                {registration.notes || <span className="text-muted-foreground italic">No notes provided</span>}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                        <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                            Close
                        </Button>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                            <Button variant="outline" className="mb-2 sm:mb-0" onClick={handleSendEmail}>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

