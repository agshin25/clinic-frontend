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
import { useCreateBlogMutation } from "@/services/blogApi"
import { ImageUploader } from "@/components/sections/admin/image-uploader"
import { useState } from "react"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    slug: z
        .string()
        .min(5, {
            message: "Slug must be at least 5 characters.",
        })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: "Slug must contain only lowercase letters, numbers, and hyphens.",
        }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    authorId: z.string(),
    imageIds: z.array(z.number()).optional(),
})

export default function NewBlogPage() {
    const router = useRouter()
    const [createBlog, { isLoading: isSubmitting }] = useCreateBlogMutation()
    const [imageIds, setImageIds] = useState<number[]>([]);
    const [images, setImages] = useState<{ imageUrl: string; id?: number }  []>([]);
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
            description: "",
            authorId: "",
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
            const response = await createBlog({ ...values, imageIds: imageIds }).unwrap()
            alert('Blog created successfully')
            router.push("/admin/blogs")
        } catch (error) {
            const err = error as Error
            alert(`Error creating blog, try again: ${err.message}`)
        }
    }

    function generateSlug() {
        const title = form.getValues("title")
        if (title) {
            const slug = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
            form.setValue("slug", slug)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <Link href="/admin/blogs" passHref>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blogs
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create New Blog</h1>
                <p className="text-muted-foreground">Add a new blog post to your website.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Blog Details</CardTitle>
                    <CardDescription>Enter the information for your new blog post.</CardDescription>
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
                                            <Input placeholder="Enter blog title" {...field} />
                                        </FormControl>
                                        <FormDescription>The title of your blog post.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="authorId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter AuthorID" {...field} />
                                        </FormControl>
                                        <FormDescription>The author of your blog post.</FormDescription>
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
                                        <FormDescription>The title of your blog post.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <div className="flex gap-2">
                                            <FormControl>
                                                <Input placeholder="enter-blog-slug" {...field} />
                                            </FormControl>
                                            <Button type="button" variant="outline" onClick={generateSlug}>
                                                Generate
                                            </Button>
                                        </div>
                                        <FormDescription>The URL-friendly version of the title.</FormDescription>
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
                                            <Textarea placeholder="Enter blog description" className="min-h-32" {...field} />
                                        </FormControl>
                                        <FormDescription>The content of your blog post.</FormDescription>
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
                                    <FormDescription>Upload images for your blog post. You can upload up to 5 images.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Blog
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
