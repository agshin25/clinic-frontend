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
import { use, useEffect, useState } from "react"
import { useGetOneDoctorQuery, useUpdateDoctorMutation } from "@/services/doctorApi"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    surname: z.string().min(2, {
        message: "Surname must be at least 2 characters.",
    }),
    specialty: z.string().min(2, {
        message: "Specialty must be at least 2 characters.",
    }).optional(),
    shortAbout: z.string().min(10, {
        message: "Short About must be at least 10 characters.",
    }).max(500, {
        message: "Short About cannot exceed 500 characters.",
    }).optional(),
    profileImageId: z.number().optional(),
});
export default function NewDoctorPage({params}: {params: Promise<{id: string}>}) {
    const router = useRouter()
    const [updateDoctor, { isLoading: isSubmitting }] = useUpdateDoctorMutation()
    const [imageIds, setImageIds] = useState<number[]>();
    const [images, setImages] = useState<{ imageUrl: string; id?: number }[]>();
    const unwrappedParams = use(params)
    const {data} = useGetOneDoctorQuery(+unwrappedParams.id)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name,
            surname: data?.surname,
            shortAbout: data?.shortAbout,
            specialty: data?.specialty,
            profileImageId: undefined ,
        },
    })

     useEffect(() => {
        if (data) {
          form.reset({
              name: data?.name,
              surname: data?.surname,
              shortAbout: data?.shortAbout,
              specialty: data?.specialty,
              profileImageId: undefined,
          })
            setImages(data.profileImage ? [{ id: data.profileImage.id!, imageUrl: data.profileImage.imageUrl }] : undefined);
        }
      }, [data, form])

    function setImage(newImages: { id?: number, imageUrl: string }[]) {
        const updatedImageIds = newImages
            .map((img) => img.id)
            .filter((id): id is number => id !== undefined);

        setImageIds(updatedImageIds);
        setImages(newImages.map((img) => ({ id: img.id!, imageUrl: img.imageUrl })));
        form.setValue("profileImageId", updatedImageIds[0]);
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await updateDoctor({id: +unwrappedParams.id, ...values, profileImageId: imageIds?.[0]}).unwrap()
            console.log("Doctor added successfully:", response)

            router.push("/admin/doctors")
        } catch (error) {
            console.error("Error adding doctor:", error)
        }
    }

  

    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <Link href="/admin/doctors" passHref>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Doctors
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Update Doctor Details</h1>
                <p className="text-muted-foreground">Update a doctor.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Doctor Details</CardTitle>
                    <CardDescription>Enter the information for your doctor.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the name" {...field} />
                                        </FormControl>
                                        <FormDescription>The name of your doctor.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="surname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Surname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the surname" {...field} />
                                        </FormControl>
                                        <FormDescription>The surname of your doctor.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="specialty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sepciality</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the specialty" {...field} />
                                        </FormControl>
                                        <FormDescription>The specialty of your doctor.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shortAbout"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter info about Doctor" className="min-h-32" {...field} />
                                        </FormControl>
                                        <FormDescription>The short info about doctor.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="profileImageId"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <ImageUploader
                                                images={images ?? []} maxImages={5}
                                                onChange={(newImages) => setImage(newImages)}
                                            />
                                        </FormControl>
                                        <FormDescription>Upload image for your doctor profile. You can upload up to 5 images.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" onClick={() => router.push("/admin/doctors")}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Update Doctor
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
