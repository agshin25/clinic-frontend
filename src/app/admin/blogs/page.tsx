"use client"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BlogsTableActions } from "@/components/sections/admin/blogs-table-actions"
import { useGetBlogsQuery } from "@/services/blogApi"


export default function BlogsPage() {
    const { data: blogs, error, isLoading } = useGetBlogsQuery();
    
    return (    
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
                    <p className="text-muted-foreground">Manage your blog posts and content.</p>
                </div>
                <Link href="/admin/blogs/new" passHref>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Blog
                    </Button>
                </Link>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="hidden md:table-cell">Created</TableHead>
                            <TableHead className="hidden md:table-cell">Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs?.map((blog) => (
                            <TableRow key={blog.id}>
                                <TableCell className="font-medium">{blog.title}</TableCell>
                                <TableCell>{blog.slug}</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(blog.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <BlogsTableActions blog={blog} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

