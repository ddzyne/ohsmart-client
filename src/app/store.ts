import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import metadataReducer from '../features/metadata/metadataSlice';
import filesReducer from '../features/files/filesSlice';
import submitReducer from '../features/submit/submitSlice';
import notificationReducer from '../features/notification/notificationSlice';
import { orcidApi } from '../features/metadata/api/orcid';
import { rorApi } from '../features/metadata/api/ror';
import { geonamesApi } from '../features/metadata/api/geonames';
import { submitApi } from '../features/submit/submitApi';
import { dansFormatsApi } from '../features/files/api/dansFormats';
import { dansUtilityApi } from '../features/files/api/dansUtility';
import { dansVerificationApi } from '../features/files/api/dansVerification';
import { rtkQueryErrorLogger } from './error';

export const store = configureStore({
  reducer: {
    metadata: metadataReducer,
    files: filesReducer,
    [orcidApi.reducerPath]: orcidApi.reducer,
    [rorApi.reducerPath]: rorApi.reducer,
    [geonamesApi.reducerPath]: geonamesApi.reducer,
    [submitApi.reducerPath]: submitApi.reducer,
    [dansFormatsApi.reducerPath]: dansFormatsApi.reducer,
    [dansVerificationApi.reducerPath]: dansVerificationApi.reducer,
    [dansUtilityApi.reducerPath]: dansUtilityApi.reducer,
    submit: submitReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(orcidApi.middleware)
      .concat(rorApi.middleware)
      .concat(geonamesApi.middleware)
      .concat(submitApi.middleware)
      .concat(dansFormatsApi.middleware)
      .concat(dansVerificationApi.middleware)
      .concat(dansUtilityApi.middleware)
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
