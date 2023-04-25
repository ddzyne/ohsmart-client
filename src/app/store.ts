import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import metadataReducer from '../features/metadata/metadataSlice';
import filesReducer from '../features/files/filesSlice';
import { orcidAPI } from '../features/metadata/api/orcid';
import { rorAPI } from '../features/metadata/api/ror';

export const store = configureStore({
  reducer: {
    metadata: metadataReducer,
    files: filesReducer,
    [orcidAPI.reducerPath]: orcidAPI.reducer,
    [rorAPI.reducerPath]: rorAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(orcidAPI.middleware)
      .concat(rorAPI.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
