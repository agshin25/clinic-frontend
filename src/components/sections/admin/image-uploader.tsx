"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, Upload, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useUploadImageMutation } from "@/services/uploadApi"

interface ImageUploaderProps {
    images: { imageUrl: string; id?: number }[]
    onChange: (images: { imageUrl: string; id?: number }[]) => void
    maxImages?: number
}

export function ImageUploader({ images, onChange, maxImages = 5 }: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [uploadImage] = useUploadImageMutation()

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files)
            await handleFiles(files)
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); // Prevent the event from bubbling up
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files)
            await handleFiles(files)
        }
    }

    const handleFiles = async (files: File[]) => {
        const imageFiles = files.filter((file) => file.type.startsWith("image/"));

        const filesToProcess = imageFiles.slice(0, maxImages - images.length);
        if (filesToProcess.length === 0) return;

        const uploadedImages = [];

        for (const file of filesToProcess) {
            try {
                console.log("Uploading file:", file);

                const formData = new FormData();
                formData.append("image", file);

                const response = await uploadImage(formData).unwrap();

                if (response?.imageUrl) {
                    uploadedImages.push({ imageUrl: response.imageUrl, id: response.id });
                }

            } catch (error) {
                console.error("Upload failed", error);
            }
        }

        onChange([...images, ...uploadedImages]);
    };

    const removeImage = (index: number) => {
        let newImages = [...images]
        newImages = newImages.filter(item => item.id !== index)
        onChange(newImages)
    }

    return (
        <div className="space-y-4">
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-primary/10 p-2">
                        <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-sm font-medium">Drag and drop your images here or click to browse</p>
                        <p className="text-xs text-muted-foreground">Supports: JPG, PNG, GIF (Max {maxImages} images)</p>
                    </div>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        disabled={images.length >= maxImages}
                    />
                    <Button
                        type="button" // Explicitly set type to button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent form submission
                            document.getElementById("file-upload")?.click();
                        }}
                        disabled={images.length >= maxImages}
                    >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Browse Files
                    </Button>
                </div>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {images.map((image, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardContent className="p-2">
                                <div className="relative aspect-square">
                                    <Image
                                        src={image.imageUrl || "/placeholder.svg"}
                                        alt={`Uploaded image ${index + 1}`}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                    <Button
                                        type="button" // Explicitly set type to button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-1 right-1 h-6 w-6"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent form submission
                                            removeImage(image.id!);
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}