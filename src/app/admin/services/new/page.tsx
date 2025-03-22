"use client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ImageUploader } from "@/components/sections/admin/image-uploader"
import { useState } from "react"
import { useCreateServiceMutation } from "@/services/serviceApi"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    description: z.string().min(65, {
        message: "Description must be at least 65 characters.",
    }),
    imageIds: z.array(z.number()).optional(),
})

export default function NewBlogPage() {
    const router = useRouter()
    const [createService, { isLoading: isSubmitting }] = useCreateServiceMutation()
    const [imageIds, setImageIds] = useState<number[]>([]);
    const [images, setImages] = useState<{ imageUrl: string; id?: number }  []>([]);
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            imageIds: [],
        },
    })

    function setImage(newImages: { id?: number, imageUrl: string }[]) {
        const updatedImageIds = newImages
            .map((img) => img.id)
            .filter((id): id is number => id !== undefined);

        setImageIds(updatedImageIds);
        setImages(newImages.map((img) => ({ id: img.id!, imageUrl: img.imageUrl })));
        form.setValue("imageIds", updatedImageIds);
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await createService({ ...values, imageIds: imageIds }).unwrap()
            console.log("Service created successfully:", response)

            router.push("/admin/services")
        } catch (error) {
            console.error("Error creating service:", error)
        }
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
                <h1 className="text-3xl font-bold tracking-tight">Create New Service</h1>
                <p className="text-muted-foreground">Add a new service  to your website.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                    <CardDescription>Enter the information for your new service.</CardDescription>
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
                                            <Input placeholder="Enter service title" {...field} />
                                        </FormControl>
                                        <FormDescription>The title of your service.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="imageIds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter image ids" 
                                                value={field.value?.join(", ") || ""}
                                                onChange={(e) => {
                                                    const ids = e.target.value
                                                        .split(",") 
                                                        .map(id => id.trim())
                                                        .filter(id => id !== "") 
                                                        .map(Number) 
                                                        .filter(id => !isNaN(id)); 

                                                    field.onChange(ids); 
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
                                        <FormDescription>The content of your service.</FormDescription>
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
                                    <FormDescription>Upload images for your service. You can upload up to 5 images.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Service
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
