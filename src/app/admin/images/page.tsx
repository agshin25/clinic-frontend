"use client"
import Link from "next/link"
import Image from "next/image"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImagesActions } from "@/components/sections/admin/images-actions"
import { useGetImagesQuery } from "@/services/uploadApi"

export default function ImagesPage() {
    const {data: images} = useGetImagesQuery()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Images</h1>
                    <p className="text-muted-foreground">Manage your image library for blogs, services, and courses.</p>
                </div>
                {/* <Link href="/dashboard/images/upload" passHref>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Upload Images
                    </Button>
                </Link> */}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {images?.map((image) => (
                    <Card key={image.id} className="overflow-hidden">
                        <CardContent className="p-2">
                            <div className="relative aspect-square">
                                <Image
                                    src={image.imageUrl || "/placeholder.svg"}
                                    alt={`Image ${image.id}`}
                                    fill
                                    className="object-cover rounded-md"
                                />
                                <ImagesActions image={image} />
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">{new Date(image.createdAt).toLocaleDateString()}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

