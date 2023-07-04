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
            password: args.password,
            userType: args.userType,
            phoneNumber: args.phoneNumber,
            dob: args.dob,
            businessName: args.businessName,
            cacNo: args.cacNo,
            location: args.location,
            address: args.address,
            gender: args.genderValue,
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
        const formData = new FormData()
        formData.append('description', args.description)
        formData.append('servicesDescription', args.servicesDescription)
        formData.append('servicePrice', args.servicePrice)
        formData.append('city', args.city)
        formData.append('PortfolioFirst', args.PortfolioFirst)
        formData.append('PortfolioSecond', args.PortfolioSecond)
        formData.append('idNumber', args.idNumber)
        formData.append('scheduleDate', args.scheduleDate)
        formData.append('appointmentTime', args.appointmentTime)
        formData.append('serviceId', args.serviceId)
        if (args.ProfilePicture) {
          formData.append('ProfilePicture', {
            uri: args.ProfilePicture.uri,
            name: args.ProfilePicture.filename,
            type: args.ProfilePicture.type,
          })
        }
        if (args.serviceImageFirst) {
          formData.append('serviceImageFirst', {
            uri: args.serviceImageFirst.uri,
            name: args.serviceImageFirst.filename,
            type: args.serviceImageFirst.type,
          })
        }
        if (args.serviceImageSecond) {
          formData.append('serviceImageSecond', {
            uri: args.serviceImageSecond.uri,
            name: args.serviceImageSecond.filename,
            type: args.serviceImageSecond.type,
          })
        }
        if (args.serviceImageThird) {
          formData.append('serviceImageThird', {
            uri: args.serviceImageThird.uri,
            name: args.serviceImageThird.filename,
            type: args.serviceImageThird.type,
          })
        }
        return {
          url: '/users/service',
          method: 'PATCH',
          body: formData
        }
      },
    }),

    createServiceContract: builder.mutation<any, any>({
      query: (args) => {
        return {
          url: '/auth/',
          method: 'POST',
          body: {
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
  useCreateServiceContractMutation,
} = api