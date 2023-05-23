import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { OrcidResponse } from '../../../types/Api';

export const orcidApi = createApi({
  reducerPath: 'orcid',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pub.orcid.org/v3.0/expanded-search/' }),
  endpoints: (build) => ({
    fetchOrcid: build.query({
      query: (content) => {
        // Reformat the input string, replacing all spaces with +AND+ operators (and remove double spaces too)
        const search = content.replace(/\s+/g,'+AND+');
        return ({
          url: `?q=${search}`,
          headers: {Accept: "application/vnd.orcid+json"},
        })
      },
      transformResponse: (response: OrcidResponse, meta, arg) => {
        // Return an empty array when no results, which is what the Autocomplete field expects
        return response['num-found'] > 0 ? 
          ({
            arg: arg,
            response: 
              response['expanded-result'].map( item => ({
                label: `${item['given-names']} ${item['family-names']}`,
                extra: item['institution-name'],
                extraLabel: 'institutions',
                value: item['orcid-id'], 
              })),
          }) :
          [];
      },
    }),
  }),
});

export const {
  useFetchOrcidQuery,
} = orcidApi;