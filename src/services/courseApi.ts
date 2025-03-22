import { Blog } from "@/interfaces/blog";
import { apiSlice } from "./apiSlice";
import { Course } from "@/interfaces/course";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query<Course[], void >({
            query: () => '/course',
            providesTags: ['Courses'],
        }),
        getCourseById: builder.query<Course, number>({
            query: (id) => `/course/${id}`,
            providesTags: (result, error, id) => [{ type: 'Courses', id }],
        }),
        createCourse: builder.mutation({
            query: (course) => ({
                url: '/course',
                method: 'POST',
                body: course,
            }),
            invalidatesTags: ['Courses'],
        }),
        updateCourse: builder.mutation({
            query: ({ id, ...course }) => ({
                url: `/course/${id}`,
                method: 'POST',
                body: course,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Courses', id }],
        }),
        courseRegistrations: builder.query<Course, number>({
            query: (id) => `/course/${id}/registrants`,
            providesTags: (result, error, id) => [{ type: 'Courses', id }],
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/course/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Courses'],
        }),
        registerCourse: builder.mutation({
            query:({id, ...body}) => ({
                url: `/course/${id}/register`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ['Courses']
        })
    }),
});

export const {
    useCreateCourseMutation,
    useGetCourseByIdQuery,
    useGetCoursesQuery,
    useDeleteCourseMutation,
    useUpdateCourseMutation,
    useCourseRegistrationsQuery,
    useRegisterCourseMutation
} = courseApi;