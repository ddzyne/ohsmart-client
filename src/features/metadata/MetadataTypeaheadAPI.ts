import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../../app/store';

export const typeaheadAPI = createApi({
  reducerPath: 'typeahead',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pub.orcid.org/v3.0/expanded-search/' }),
  endpoints: (build) => ({
    fetchOrcid: build.query<any, string>({
      query: (content) => ({
        url: `?q=${content}`,
        headers: {Accept: "application/vnd.orcid+json"},
      }),
      transformResponse: (response: any, meta, arg) => {
        console.log(response)
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
} = typeaheadAPI;