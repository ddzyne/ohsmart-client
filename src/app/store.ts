import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import metadataReducer from '../features/metadata/metadataSlice';
import filesReducer from '../features/files/filesSlice';
import { orcidApi } from '../features/metadata/api/orcid';
import { rorApi } from '../features/metadata/api/ror';
import { submitApi } from '../features/submit/submitApi';

export const store = configureStore({
  reducer: {
    metadata: metadataReducer,
    files: filesReducer,
    [orcidApi.reducerPath]: orcidApi.reducer,
    [rorApi.reducerPath]: rorApi.reducer,
    [submitApi.reducerPath]: submitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(orcidApi.middleware)
      .concat(rorApi.middleware)
      .concat(submitApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
