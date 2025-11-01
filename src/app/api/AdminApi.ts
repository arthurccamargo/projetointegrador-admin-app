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
  endpoints: (builder) => ({
    getAllOngs: builder.query<any, void>({
      query: () => ({
        url: "/admin/ongs",
        method: "GET",
      }),
    }),
    getAllVolunteers: builder.query<any, void>({
      query: () => ({
        url: "/admin/volunteers",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOngsQuery, useGetAllVolunteersQuery } = adminApi;
