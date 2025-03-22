import { Doctor } from "./doctor";

export interface Blog {
    id: number;
    title: string;
    slug: string;
    description: string;
    authorId: number,
    author: Doctor
    createdAt: string;
    updatedAt: string;
    images: { id: number; imageUrl: string }[];
}


export interface BlogImage {
    id?: number;
    imageUrl: string;
}


export interface CreateBlogRequest {
    title: string;
    slug: string;
    description: string;
    images?: BlogImage[];
}