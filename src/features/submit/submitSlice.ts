import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// load the imported form and close all accordion panels by default
const initialState = {
  progress: undefined
}

export const submitSlice = createSlice({
  name: 'submit',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<any>) => {
      state.progress = action.payload;
    },
  }
});

export const { setProgress } = submitSlice.actions;

// Select values from state
export const getProgress = (state: RootState) => state.submit.progress;

export default submitSlice.reducer;
