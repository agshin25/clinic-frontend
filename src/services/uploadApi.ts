import { image } from "@/interfaces/image";
import { apiSlice } from "./apiSlice";

export const uploadApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
         getImages: builder.query<image[], void>({
                    query: () => '/upload',
                    providesTags: ['Uploads'],
        }),
        uploadImage: builder.mutation({
            query: (image) => ({
                url: '/upload',
                method: 'POST',
                body: image,
            }),
            invalidatesTags: ['Uploads'],
        }),
        deleteImage: builder.mutation({
            query: (id) => ({
                url: `/upload/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Uploads'],
        }),
    }),
});

export const {
    useUploadImageMutation,
    useDeleteImageMutation,
    useGetImagesQuery
} = uploadApi;