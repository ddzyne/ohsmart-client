import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError, AxiosProgressEvent } from 'axios'
import { setProgress } from './submitSlice';
import { store } from '../../app/store';

// TODO
// Error handling
// Status updates

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
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (data instanceof FormData) {
            // it's a file!
            // Calculate progress percentage and set state in fileSlice
            // TODO Finish this!
            const percentCompleted = progressEvent.total ? Math.round( (progressEvent.loaded * 100) / progressEvent.total ) : 0;
            store.dispatch(setProgress(percentCompleted));
          }
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
  reducerPath: 'submitApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://httpbin.org/' }),
  endpoints: (build) => ({
    submitData: build.mutation({
      query: (data) => {
        console.log(data)
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