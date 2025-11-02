import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Ongs", "Volunteers"],
  endpoints: (builder) => ({
    getAllOngs: builder.query<any, void>({
      query: () => ({
        url: "/admin/ongs",
        method: "GET",
      }),
      providesTags: ["Ongs"],
    }),
    getAllVolunteers: builder.query<any, void>({
      query: () => ({
        url: "/admin/volunteers",
        method: "GET",
      }),
      providesTags: ["Volunteers"],
    }),
    updateUserStatus: builder.mutation<any, { id: string; status: "ACTIVE" | "BLOCKED" }>({
      query: ({ id, status }) => ({
        url: `/admin/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Ongs", "Volunteers"],
    }),
  }),
});

export const {
  useGetAllOngsQuery,
  useGetAllVolunteersQuery,
  useUpdateUserStatusMutation,
} = adminApi;
