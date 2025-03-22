import { apiSlice } from "./apiSlice";

const serviceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<Service[], void>({
            query: () => '/clinic_service' ,
            providesTags: ['Uploads']
        }),
        getOneService: builder.query<Service, number>({
            query: (id) => `/clinic_service/${id}`,
            providesTags: (result, error, id) => [{ type: 'Services', id }],
        }),
        createService: builder.mutation({
            query: (service) => ({
                url: '/clinic_service',
                method: 'POST',
                body: service
            }),
            invalidatesTags: ['Services'],
        }),
        updateService: builder.mutation({
            query: ({id, ...service}) => ({
                url: `/clinic_service/${id}`,
                method: 'POST',
                body: service
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Services', id }],
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/clinic_service/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Services']
        })
    })
})

export const {
    useGetServicesQuery,
    useGetOneServiceQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation
}= serviceApi