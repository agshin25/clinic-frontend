"use client"

import { useState } from "react"
import { MoreHorizontal, Trash2, Download, LinkIcon } from "lucide-react"

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
import { useDeleteImageMutation } from "@/services/uploadApi"

interface ImagesActionsProps {
    image: {
        id: number
        imageUrl: string
    }
}

export function ImagesActions({ image }: ImagesActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deleteImage] = useDeleteImageMutation()

    const handleDelete = async () => {
        setShowDeleteDialog(false)
        try {
            await deleteImage(image.id).unwrap()
            alert(`Deleting image with ID: ${image.id}`)
        } catch (error) {
            const err = error as Error
            alert(`Error: ${err.message}`)
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(image.imageUrl)
    }

    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = image.imageUrl
        link.download = `image-${image.id}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <div className="absolute top-2 right-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleCopyLink}>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            <span>Copy Link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
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
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this image. This action cannot be undone.
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
        </>
    )
}