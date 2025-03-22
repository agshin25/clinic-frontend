"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ImageUploader } from "@/components/sections/admin/image-uploader"
import { useGetOneServiceQuery, useUpdateServiceMutation } from "@/services/serviceApi"
import { Image } from "@/interfaces/service"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    description: z.string().min(65, {
        message: "Description must be at least 65 characters.",
    }),
    imageIds: z.array(z.number()).optional(),
})



export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [imageIds, setImageIds] = useState<number[]>([]);
    const [images, setImages] = useState<{ imageUrl: string; id?: number }[]>([]);

    const unwrappedParams = use(params)
    console.log(unwrappedParams);
    
    const { data, error, isLoading } = useGetOneServiceQuery(+unwrappedParams.id);
    const [updateService, { isLoading: isSubmitting }] = useUpdateServiceMutation()
    




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    useEffect(() => {
        if (data) {
            form.reset({
                title: data.title || "",
                description: data.description || "",
            })
            setImages(data.images.map((img: Image ) => ({ id: img.id!, imageUrl: img.imageUrl })));
        }
    }, [data, form])


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await updateService({ id: +unwrappedParams.id, ...values, imageIds: imageIds }).unwrap()
            console.log("Servcie updated successfully:", response)

            router.push("/admin/services")
        } catch (error) {
            console.error("Error updating service:", error)
        }
    }

    function setImage(newImages: { id?: number, imageUrl: string }[]) {
        const updatedImageIds = newImages
            .map((img) => img.id)
            .filter((id): id is number => id !== undefined);

        setImageIds(updatedImageIds);
        setImages(newImages.map((img) => ({ id: img.id!, imageUrl: img.imageUrl })));
        form.setValue("imageIds", updatedImageIds);
    }




    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center">
                    <Link href="/admin/services" passHref>
                        <Button variant="ghost" size="sm" className="gap-1">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Services
                        </Button>
                    </Link>
                </div>

                <Card className="p-6">
                    <div className="text-center text-destructive">
                        <p>error</p>
                        <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/services")}>
                            Return to Services
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <Link href="/admin/services" passHref>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Services
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Servcie</h1>
                <p className="text-muted-foreground">Update your service information.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                    <CardDescription>Edit the information for your service.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter service title"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    form.clearErrors("title")
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>The title of your service.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter service description" className="min-h-32" {...field} />
                                        </FormControl>
                                        <FormDescription>The content of your service post.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageIds"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <ImageUploader
                                                images={images ?? []} maxImages={5}
                                                onChange={(newImages) => setImage(newImages)}
                                            />
                                        </FormControl>
                                        <FormDescription>Upload images for your service . You can upload up to 5 images.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update Service
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

