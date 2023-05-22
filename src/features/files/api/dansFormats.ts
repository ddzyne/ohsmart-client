import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { DansSimpleList } from '../../../types/Files';

export const dansFormatsApi = createApi({
  reducerPath: 'dansFormats',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://facades.type.dataverse.tk/' }),
  endpoints: (build) => ({
    fetchDansFormats: build.query({
      query: () => ({
        url: `dans-formats`,
        headers: {Accept: 'application/json'},
      }),
    }),
    fetchSimpleList: build.query({
      query: () => ({
        url: `type-list-simple`,
        headers: {Accept: 'application/json'},
      }),
      transformResponse: (response: DansSimpleList, meta, arg) => {
        return response.list;
      },
    }),
  }),
});

export const {
  useFetchDansFormatsQuery,
  useFetchSimpleListQuery,
} = dansFormatsApi;