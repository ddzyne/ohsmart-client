import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const geonamesApi = createApi({
  reducerPath: 'geonames',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.geonames.org/searchJSON?q=' }),
  endpoints: (build) => ({
    fetchGeonamesFreeText: build.query({
      query: (content) => ({
        url: `${content}&username=dans_deposit_webapp`,
        headers: {Accept: "application/json"},
      }),
      transformResponse: (response: any, meta, arg) => {
        // Return an empty array when no results, which is what the Autocomplete field expects
        return response.totalResultsCount > 0 ? 
          ({
            arg: arg,
            response: 
              response.geonames.map( (item: any) => ({
                label: `${item.name} (${item.fcodeName}) ${item.countryName ? item.countryName : ''}`,
                value: item.geonameId, 
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