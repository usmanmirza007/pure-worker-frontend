import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './baseurl'
import { emptySplitApi } from './emptySplitApi'

export const api = emptySplitApi.injectEndpoints({
  // reducerPath: 'api',
  // baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    signup: builder.mutation<any, any>({
      query: (args) => {
        return {
          url: '/auth/',
          method: 'POST',
          body: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            userType: args.userType,
            phoneNumber: args.phoneNumber,
            dob: args.dob,
            businessName: args.businessName,
            cacNo: args.cacNo,
            location: args.location,
            address: args.address,
            gender: args.gender,
            nationality: args.nationalityValue
          }
        }
      },
    }),

    login: builder.mutation<any, any>({
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

    verifyOtp: builder.mutation<any, any>({
      query: (args) => {

        return {
          url: '/auth/otpVerify',
          method: 'POST',
          body: {
            email: args.email,
            otp: args.otp
          }
        }
      },
    }),

    createOtp: builder.mutation<any, any>({
      query: (args) => {

        return {
          url: '/auth/otp',
          method: 'POST',
          body: {
            email: args.email,
          }
        }
      },
    }),

    resetOtp: builder.mutation<any, any>({
      query: (args) => {

        return {
          url: '/auth/resetOtp',
          method: 'PATCH',
          body: {
            email: args.email,
          }
        }
      },
    }),

    getUser: builder.query<void, any>({
      query: () => {
        return {
          url: '/users/',
          method: 'GET',
        }
      },
      providesTags: ['User'],
    }),

    getCategory: builder.query<any, void>({
      query: () => {
        return {
          url: '/users/category',
          method: 'GET',
        }
      },
    }),

    getSubCategories: builder.query<void, { categoryId: number }>({
      query: (args) => {
        return {
          url: `/users/category/${args.categoryId}`,
          method: 'GET',
        }
      },
    }),

    createService: builder.mutation<any, any>({
      query: (args) => {
        return {
          url: '/users/service',
          method: 'PATCH',
          body: {
            description: args.description,
            servicesDescription: args.servicesDescription,
            servicePrice: args.servicePrice,
            city: args.city,
            idNumber: args.idNumber,
            scheduleDate: args.scheduleDate,
            appointmentTime: args.appointmentTime,
            addressFirst: args.addressFirst,
            fullNameFirst: args.fullNameFirst,
            relationFirst: args.relationFirst,
            emailFirst: args.emailFirst,
            phoneNumberFirst: args.phoneNumberFirst,
            fullNameSecond: args.fullNameSecond,
            relationSecond: args.relationSecond,
            emailSecond: args.emailSecond,
            phoneNumberSecond: args.phoneNumberSecond,
            addressSecond: args.addressSecond,
            potfolios: args.potfolios,
            profilePicture: args.profilePicture,
            serviceId: args.serviceId,
          }
        }
      },
    }),

  }),
  overrideExisting: true,
})

export const {
  useSignupMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useCreateOtpMutation,
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
  useCreateServiceMutation,
  useResetOtpMutation,
} = api