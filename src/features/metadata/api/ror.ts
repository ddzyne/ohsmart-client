import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const rorApi = createApi({
  reducerPath: 'ror',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.ror.org' }),
  endpoints: (build) => ({
    fetchRorByName: build.query({
      query: (content) => ({
        url: `organizations?query.advanced=name:${content}`,
        headers: {Accept: "application/json"},
      }),
      transformResponse: (response: any) => {
        // Return an empty array when no results, which is what the Autocomplete field expects
        return response.number_of_results > 0 ? 
          response.items.map( (item: any) => ({
            label: item.name,
            value: item.id, 
          })) :
          [];
      },
    }),
  }),
});

export const {
  useFetchRorByNameQuery,
} = rorApi;