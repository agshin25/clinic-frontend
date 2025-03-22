"use client"

import { useState } from "react"
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
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { ImageUploader } from "@/components/sections/admin/image-uploader"
import { useCreateCourseMutation } from "@/services/courseApi"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    duration: z.string().min(3, {
        message: "Duration is required.",
    }),
    price: z.coerce.number().min(0, {
        message: "Price must be a positive number.",
    }),
    isActive: z.boolean().default(true),
    imageIds: z.array(z.number()).optional()
})

export default function NewCoursePage() {
    const router = useRouter()
    const [imageIds, setImageIds] = useState<number[]>([]);
    const [images, setImages] = useState<{ imageUrl: string; id?: number }  []>([]);
    const [creaetCourse, {isLoading : isSubmitting}] = useCreateCourseMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: "",
            price: 0,
            isActive: true,
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
            await creaetCourse({...values, imageIds: imageIds}).unwrap()
            console.log("Course created succesfully")
            router.push("/admin/courses")
        } catch (error) {
            console.error("Error creating course:", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <Link href="/admin/courses" passHref>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Courses
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
                <p className="text-muted-foreground">Add a new educational course to your website.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                    <CardDescription>Enter the information for your new course.</CardDescription>
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
                                            <Input placeholder="Enter course title" {...field} />
                                        </FormControl>
                                        <FormDescription>The title of your course.</FormDescription>
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
                                            <Textarea placeholder="Enter course description" className="min-h-32" {...field} />
                                        </FormControl>
                                        <FormDescription>A detailed description of what the course covers.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-8 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 4 weeks, 3 months" {...field} />
                                            </FormControl>
                                            <FormDescription>The length of the course.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price ($)</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                            </FormControl>
                                            <FormDescription>The cost of the course in USD.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Active Status</FormLabel>
                                            <FormDescription>Make this course visible and available for registration.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
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
                                                images={images ?? []} 
                                                maxImages={5}
                                                onChange={(newImages) => setImage(newImages)} />
                                        </FormControl>
                                        <FormDescription>Upload images for your course. You can upload up to 5 images.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" onClick={() => router.push("/admin/courses")}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Course
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

