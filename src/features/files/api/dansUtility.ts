import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const dansUtilityApi = createApi({
  reducerPath: 'dansUtility',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://utility.formats.dataverse.tk/' }),
  endpoints: (build) => ({
    checkType: build.query({
      query: (content) => ({
        url: `type/${content}`,
        headers: {Accept: 'application/json'},
      }),
      transformResponse: (response, meta, arg) => response,
    }),
  }),
});

export const {
  useCheckTypeQuery,
} = dansUtilityApi;