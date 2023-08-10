import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import type { AuthState, SetAuthProvider } from '../types/Auth';

const initialState: AuthState = {
  authority: '',
  client_id: '',
  scope: '',
  redirect_uri: process.env.REACT_APP_LOGIN_REDIRECT_URI as string,
  loadUserInfo: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthProvider: (state, action: PayloadAction<SetAuthProvider>) => {
      return state = {
        ...state,
        authority: action.payload.authority,
        client_id: action.payload.client_id,
        scope: action.payload.scope,
      }
    },
  },
})

export const { setAuthProvider } = authSlice.actions;

// Selectors
export const getAuthProvider = (state: RootState) => state.auth;

export default authSlice.reducer;
