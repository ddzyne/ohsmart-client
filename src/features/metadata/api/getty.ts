import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { XMLParser } from 'fast-xml-parser';
import type { GettyResponse } from '../../../types/Api';

export const gettyApi = createApi({
  reducerPath: 'getty',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://vocabsservices.getty.edu/' }),
  endpoints: (build) => ({
    fetchGettyAATTerms: build.query({
      query: (content) => ({
        url: `AATService.asmx/AATGetTermMatch?term=${content}&logop=and&notes=`,
        // convert XML response to text string, so we can parse that later on
        responseHandler: (response) => response.text(),
      }),
      transformResponse: (response: any, meta, arg) => {
        // convert xml text string to JSON
        const parser = new XMLParser();
        const json: GettyResponse = parser.parse(response);
        // Return an empty array when no results, which is what the Autocomplete field expects
        return json.Vocabulary.Count > 0 ? 
          ({
            arg: arg,
            response: 
              json.Vocabulary.Subject.map( (item: any) => ({
                label: item.Preferred_Term,
                value: `http://vocab.getty.edu/page/aat/${item.Subject_ID}`, 
              })),
          })
          :
          [];
      },
    }),
  }),
});

export const {
  useFetchGettyAATTermsQuery,
} = gettyApi;