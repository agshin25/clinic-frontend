import { Blog } from "@/interfaces/blog";
import { apiSlice } from "./apiSlice";

export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<Blog[], void >({
            query: () => '/blogs',
            providesTags: ['Blogs'],
        }),
        getBlogById: builder.query<Blog, number>({
            query: (id) => `/blogs/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blogs', id }],
        }),
        createBlog: builder.mutation({
            query: (blog) => ({
                url: '/blogs',
                method: 'POST',
                body: blog,
            }),
            invalidatesTags: ['Blogs'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, ...blog }) => ({
                url: `/blogs/${id}`,
                method: 'POST',
                body: blog,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blogs'],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;