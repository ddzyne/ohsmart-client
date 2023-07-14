import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { ElsstResponse } from '../../../types/Api';

export const elsstApi = createApi({
  reducerPath: 'elsst',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://thesauri.cessda.eu/rest/v1' }),
  endpoints: (build) => ({
    fetchElsstTerm: build.query({
      query: (content) => ({
        url: `search?query=${content}*&vocab=elsst-3&unique=true&lang=en`,
        headers: {Accept: "application/json"},
      }),
      transformResponse: (response: ElsstResponse, meta, arg) => {
        // Return an empty array when no results, which is what the Autocomplete field expects
        return response.results.length > 0 ? 
          ({
            arg: arg,
            response: 
              response.results.map( item => ({
                label: item.prefLabel.charAt(0).toUpperCase() + item.prefLabel.slice(1).toLowerCase(),
                value: item.uri,
                lang: item.lang,
              })),
          })
          :
          [];
      },
    }),
  }),
});

export const {
  useFetchElsstTermQuery,
} = elsstApi;