import { apiSlice } from "./apiSlice";

const appointmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query<Appointment[], void>({
            query: () => '/appointment',
            providesTags: ['Appointments']
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `appointment/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Appointments']
        }),
        makeAppointment: builder.mutation({
            query: (body) => ({
                url: '/appointment',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Appointments']
        })
    })
})

export const {
    useGetAppointmentsQuery,
    useDeleteAppointmentMutation,
    useMakeAppointmentMutation
} = appointmentApi