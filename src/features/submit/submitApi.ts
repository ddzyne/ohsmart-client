import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError, AxiosProgressEvent } from 'axios'
import { setFileMeta } from '../files/filesSlice';
import { store } from '../../app/store';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({ 
        url: baseUrl + url, 
        method, 
        data, 
        params,
        headers,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (data instanceof FormData) {
            // it's a file!
            // Calculate progress percentage and set state in fileSlice
            const percentCompleted = progressEvent.total ? Math.round( (progressEvent.loaded * 100) / progressEvent.total ) : 0;
            store.dispatch(setFileMeta({
              id: data.get('fileId') as string, 
              type: 'submitProgress', 
              value: percentCompleted,
            }));
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
  baseQuery: axiosBaseQuery({ baseUrl: 'https://utility.packaging.dataverse.tk/inbox/' }),
  endpoints: (build) => ({
    submitData: build.mutation({
      // Custom query for chaining Post functions
      // TODO: responses and error handling. Need API first.
      async queryFn(arg, queryApi, extraOptions, fetchWithBQ) {
        // First post the metadata
        const metadataResult = await fetchWithBQ({
          url: 'metadata?repo_target=dar.dans.knaw.nl',
          method: 'POST',
          data: arg.metadata,
          headers: {
            Authorization: 'Bearer D@NS-ei-2023',
            'target-username': 'user001',
            'target-password': 'user001',
          },
        })

        if (metadataResult.error)
          return { error: metadataResult.error as FetchBaseQueryError }

        // No errors, so let's post the files if there are any
        const filesResults = arg.files && await Promise.all(arg.files.map((file: any) => fetchWithBQ({
          url: 'file?repo_target=dar.dans.knaw.nl',
          method: 'POST',
          data: file,
          headers: {
            Authorization: 'Bearer D@NS-ei-2023',
            'target-username': 'user001',
            'target-password': 'user001',
          },
        })));

        console.log(metadataResult)
        console.log(filesResults)

        const fileErrors = filesResults.filter( (res: any) => res.error )

        return metadataResult.data && fileErrors.length === 0 ?
          { data: { metadataResult: metadataResult.data, filesResults: filesResults && filesResults.map( (result: any) => result.data ) } } :
          { error: fileErrors.map( (error: any) => error as FetchBaseQueryError ) }
      },
    }),
  }),
});

export const {
  useSubmitDataMutation,
} = submitApi;