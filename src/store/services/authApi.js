import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseApi from "../../api/baseApi";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:  "http://209.97.132.120:5000/app",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body) => {
        
        return {
          url: "/login",
          method: "POST",
          body,
          
        };
      },
    }),
  }),
});

export const { useSigninUserMutation } = authApi;
