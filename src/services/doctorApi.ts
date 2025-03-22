import { Doctor } from "@/interfaces/doctor";
import { apiSlice } from "./apiSlice";

const doctorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctors: builder.query<Doctor[],void>({
            query: () => '/doctors',
            providesTags: ['Doctors'],
        }),
        getOneDoctor: builder.query<Doctor,number>({
            query: (id) => `/doctors/${id}`,
            providesTags: (result, error, id) => [{ type: 'Doctors', id }],

        }),
        addDoctor: builder.mutation({
            query : (params) => ({
                url: '/doctors',
                method: 'POST',
                body: params
            }),
            invalidatesTags: ['Doctors'],

        }),
        updateDoctor: builder.mutation({
            query: ({id, ...params}) => ({
                url: `/doctors/${id}`,
                method: 'POST',
                body: params
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Doctors', id }],
        }),
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `/doctors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Doctors'],
        })
    })
})

export const {
    useGetDoctorsQuery,
    useGetOneDoctorQuery,
    useAddDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation
} = doctorApi