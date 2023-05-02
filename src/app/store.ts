import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import metadataReducer from '../features/metadata/metadataSlice';
import filesReducer from '../features/files/filesSlice';
import submitReducer from '../features/submit/submitSlice';
import notificationReducer from '../features/notification/notificationSlice';
import { orcidApi } from '../features/metadata/api/orcid';
import { rorApi } from '../features/metadata/api/ror';
import { submitApi } from '../features/submit/submitApi';
import { rtkQueryErrorLogger } from './error';

export const store = configureStore({
  reducer: {
    metadata: metadataReducer,
    files: filesReducer,
    [orcidApi.reducerPath]: orcidApi.reducer,
    [rorApi.reducerPath]: rorApi.reducer,
    [submitApi.reducerPath]: submitApi.reducer,
    submit: submitReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(orcidApi.middleware)
      .concat(rorApi.middleware)
      .concat(submitApi.middleware)
      .concat(rtkQueryErrorLogger)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
