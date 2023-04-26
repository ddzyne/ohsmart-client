import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

// TODO Switch to axios to track upload/submission progress
// Error handling
// Status

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ 
        url: baseUrl + url, 
        method, 
        data, 
        params,
        onUploadProgress: (progressEvent: any) => {
          console.log(progressEvent)
        }
      })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const submitApi = createApi({
  reducerPath: 'submit',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://httpbin.org/' }),
  endpoints: (build) => ({
    submitData: build.mutation({
      query: (data) => {
        return ({
          url: 'post',
          method: 'POST',
          data: data,
        })
      },
      transformResponse: (response, meta: any) => {
        console.log(response)
      },
    }),
  }),
});

export const {
  useSubmitDataMutation,
} = submitApi;