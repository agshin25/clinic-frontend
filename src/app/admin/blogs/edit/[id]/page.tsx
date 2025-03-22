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
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "@/services/blogApi"
import { useUploadImageMutation } from "@/services/uploadApi"

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



export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [imageIds, setImageIds] = useState<number[]>([]);
  const [images, setImages] = useState<{ imageUrl: string; id?: number }  []>([]);

  const unwrappedParams = use(params)
  const { data, error, isLoading } = useGetBlogByIdQuery(+unwrappedParams.id);
  const [updateBlog, {isLoading: isSubmitting}] = useUpdateBlogMutation()
  
  


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      authorId: "",
      description: "",
    },
  })

  useEffect(() => {
    if (data) {
      console.log(data);
      
      form.reset({
        title: data.title || "",
        slug: data.slug || "",
        authorId: data.author?.id.toString() || "",
        description: data.description || "",
        imageIds: data.images?.map((img) => img.id) || [],
      })
      setImages(data.images.map((img) => ({ id: img.id!, imageUrl: img.imageUrl })));
      setImageIds(data.images?.map((img) => img.id!) || []);
    }
  }, [data, form])


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await updateBlog({ id: +unwrappedParams.id, ...values, imageIds: imageIds }).unwrap()
      console.log("Blog updated successfully:", response)

      router.push("/admin/blogs")
    } catch (error) {
      console.error("Error creating blog:", error)
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
          <Link href="/admin/blogs" passHref>
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <div className="text-center text-destructive">
            <p>error</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/blogs")}>
              Return to Blogs
            </Button>
          </div>
        </Card>
      </div>
    )
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog</h1>
        <p className="text-muted-foreground">Update your blog post information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Details</CardTitle>
          <CardDescription>Edit the information for your blog post.</CardDescription>
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
                        placeholder="Enter blog title"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          form.clearErrors("title")
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
                name="authorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter authorId"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          form.clearErrors("authorId")
                        }}
                      />
                    </FormControl>
                    <FormDescription>The author of your blog post.</FormDescription>
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
                <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Blog
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

