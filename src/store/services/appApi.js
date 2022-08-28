// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: "appApi",
    baseUrl: "http://209.97.132.120:5000/app",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 30000,
    setTimeout: (timeout) => {
      return timeout;
    },
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo.jwt_token;

      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProductDetails: builder.query({
      query: (id) => {
       
        return {
          url: `/part/${id}`,
          method: "GET",
        };
      },
    }),
    postSale: builder.mutation({
      query: (payload ) => {
       
        return {
          url: `/sale/${payload.id}`,
          method: "POST",
          body :{
          amount:  payload?.amount,
          discount :payload?.discount,
          type: payload?.type,
          mobileNo: payload?.mobileNo,
          note: payload?.note,
          }
        };
      },
    }),
  }),
});

export const { useGetProductDetailsQuery,usePostSaleMutation } = appApi;
