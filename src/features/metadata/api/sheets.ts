import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { SheetsResponse } from '../../../types/Api';

export const sheetsApi = createApi({
  reducerPath: 'sheets',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/' }),
  endpoints: (build) => ({
    fetchSheets: build.query({
      query: (content) => ({
        url: `${content.sheetId}/values/${content.page}?key=${process.env.REACT_APP_GSHEETS_API_KEY}`,
        headers: {Accept: "application/json"},
      }),
      transformResponse: (response: SheetsResponse, meta, arg) => {
        // cut off everything above the starting row
        return response.values.length > arg.startAtRow ?
          ({
            response: response.values.slice(arg.startAtRow).map((value: any) => ({
              label: value[arg.labelCol],
              value: value[arg.valueCol],
              header: arg.headerCol !== undefined && value[arg.headerCol],
            }))
          })
          :
          [];
      },
    }),
  }),
});

export const {
  useFetchSheetsQuery,
} = sheetsApi;