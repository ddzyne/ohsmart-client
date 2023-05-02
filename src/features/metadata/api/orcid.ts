import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { notificationSlice } from '../../notification/notificationSlice';
import { store } from '../../../app/store';

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
      transformResponse: (response: any, meta, arg) => {
        // Return an empty array when no results, which is what the Autocomplete field expects
        return response['num-found'] > 0 ? 
          ({
            arg: arg,
            response: 
              response['expanded-result'].map( (item: any) => ({
                label: `${item['family-names']}, ${item['given-names']}`,
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