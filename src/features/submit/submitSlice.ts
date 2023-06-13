import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = {
  isSubmitting: false,
  metadataError: false,
  fileError: false,
}

export const submitSlice = createSlice({
  name: 'submit',
  initialState,
  reducers: {
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setMetadataError: (state, action: PayloadAction<any>) => {
      state.metadataError = action.payload;
    },
    setFileError: (state, action: PayloadAction<any>) => {
      state.fileError = action.payload;
    },
  }
});

export const { setIsSubmitting, setMetadataError, setFileError } = submitSlice.actions;

// Select values from state
export const getIsSubmitting = (state: RootState) => state.submit.isSubmitting;
export const getMetadataError = (state: RootState) => state.submit.metadataError;
export const getFileError = (state: RootState) => state.submit.fileError;

export default submitSlice.reducer;
