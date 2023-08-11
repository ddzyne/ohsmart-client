import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import type { AuthConfig, AuthProvider } from '../types/Auth';

const initialState: AuthConfig = {
  authority: '',
  client_id: '',
  scope: '',
  redirect_uri: process.env.REACT_APP_LOGIN_REDIRECT_URI as string,
  loadUserInfo: true,
  client_secret: '',
  response_type: 'code',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthProvider: (state, action: PayloadAction<AuthProvider>) => {
      return state = {
        ...state,
        authority: process.env[`REACT_APP_${action.payload.toUpperCase()}_AUTHORITY`] as string,
        client_id: process.env[`REACT_APP_${action.payload.toUpperCase()}_CLIENT_ID`] as string,
        scope: process.env[`REACT_APP_${action.payload.toUpperCase()}_CLIENT_SCOPE`] as string,
        // client_secret: process.env[`REACT_APP_${action.payload.toUpperCase()}_CLIENT_SECRET`] as string,
      }
    },
    resetAuthProvider: (state) => state = initialState,
  },
})

export const { setAuthProvider, resetAuthProvider } = authSlice.actions;

// Selectors
export const getAuthProvider = (state: RootState) => state.auth;

export default authSlice.reducer;
