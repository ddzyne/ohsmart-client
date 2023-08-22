import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const dansUtilityApi = createApi({
  reducerPath: 'dansUtility',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_UTILITY_API }),
  endpoints: (build) => ({
    checkType: build.query({
      query: (content) => ({
        url: `type/${content}`,
        headers: {Accept: 'application/json'},
      }),
    }),
  }),
});

export const {
  useCheckTypeQuery,
} = dansUtilityApi;