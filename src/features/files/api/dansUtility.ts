import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const dansUtilityApi = createApi({
  reducerPath: 'dansUtility',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_UTILITY_API }),
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