import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../../../app/store';

export const orcidAPI = createApi({
  reducerPath: 'orcid',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pub.orcid.org/v3.0/expanded-search/' }),
  endpoints: (build) => ({
    fetchOrcid: build.query<any, string>({
      query: (content) => ({
        url: `https://pub.orcid.org/v3.0/expanded-search/?q=${content}`,
        headers: {Accept: "application/vnd.orcid+json"},
      }),
      transformResponse: (response: any, meta, arg) => {
        // Return an empty array when no results, which is what the Autocomplete field expects
        return response['num-found'] > 0 ? 
          response['expanded-result'].map( (item: any) => ({
            label: `${item['family-names']}, ${item['given-names']}`,
            value: item['orcid-id'], 
          })) :
          [];
      },
    }),
  }),
});

export const {
  useFetchOrcidQuery,
} = orcidAPI;