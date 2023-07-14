import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { GeonamesResponse } from '../../../types/Api';

export const geonamesApi = createApi({
  reducerPath: 'geonames',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.geonames.org/searchJSON?q=' }),
  endpoints: (build) => ({
    fetchGeonamesFreeText: build.query({
      query: (content) => ({
        url: `${content}&username=dans_deposit_webapp`,
        headers: {Accept: "application/json"},
      }),
      transformResponse: (response: GeonamesResponse, meta, arg) => {
        // Return an empty array when no results, which is what the Autocomplete field expects
        console.log(response)
        return response.totalResultsCount > 0 ? 
          ({
            arg: arg,
            response: 
              response.geonames.map( item => ({
                label: `${item.name} (${item.fcodeName}) ${item.countryName ? item.countryName : ''}`,
                value: `https://www.geonames.org/${item.geonameId}`,
                coordinates: [item.lat, item.lng],
              })),
          })
          :
          [];
      },
    }),
  }),
});

export const {
  useFetchGeonamesFreeTextQuery,
} = geonamesApi;