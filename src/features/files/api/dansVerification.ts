import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { DansFilesResponse } from '../../../types/Files';

export const dansVerificationApi = createApi({
  reducerPath: 'fileVerification',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://utility.type.verification.dataverse.tk/' }),
  endpoints: (build) => ({
    verifyFile: build.mutation({
      query: (content) => ({
        url: `type/${content.type}`,
        method: 'POST',
        data: content.data,
        headers: {'Authorization': 'Bearer D@NS-ei-2023'}
      }),
    }),
  }),
});

export const {
  useVerifyFileMutation,
} = dansVerificationApi;