import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './baseurl'
import { emptySplitApi } from './emptySplitApi'

export const api = emptySplitApi.injectEndpoints({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    signupCustomer: builder.mutation({
      query: (args) => {
        return {
          url: '/auth/customerSignUp',
          method: 'POST',
          body: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
            type: args.type,
          }
        }
      },
      providesTags: ['GetUser']
    }),

    signupVendor: builder.mutation({
      query: (args) => {
        return {
          url: '/auth/vendorSignUp',
          method: 'POST',
          body: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
            type: args.type,
          }
        }
      },
      providesTags: ['GetUser']
    }),

    login: builder.mutation({
      query: (args) => {

        return {
          url: '/auth/login',
          method: 'POST',
          body: {
            email: args.email,
            password: args.password
          }
        }
      },
    }),

    getUser: builder.query({
      query: () => {
        return {
          url: '/users/',
          method: 'GET',
        }
      },
      providesTags: ['User', 'GetUser'],
    }),

  }),
  overrideExisting: true,
})

export const {
  useSignupCustomerMutation,
  useSignupVendorMutation,
  useLoginMutation,
} = api