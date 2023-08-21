import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { User } from 'oidc-client-ts';

function getUser() {
    const oidcStorage = sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_OIDC_AUTHORITY}:${process.env.REACT_APP_OIDC_CLIENT_ID}`)
    if (!oidcStorage) {
        return null;
    }
    return User.fromStorageString(oidcStorage);
}

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_OIDC_AUTHORITY }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    fetchUserProfile: build.query({
      query: (content) => {
        const user = getUser();
        const token = user?.access_token;
        return ({
          url: 'account',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      },
      providesTags: ['User'],
    }),
    saveUserData: build.mutation({
      query: (content) => {
        const user = getUser();
        const token = user?.access_token;
        return ({
          url: 'account',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: content,
        })
      },
      invalidatesTags: ['User'],
      transformResponse: () => {
        const user = getUser();
        console.log(user)
      }
    }),
  }),
});

export const {
  useFetchUserProfileQuery,
  useSaveUserDataMutation,
} = authApi;