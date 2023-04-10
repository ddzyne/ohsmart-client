import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import formSections from '../../config/formsections';

// load the imported form and close all accordion panels by default
const initialState: any = []

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    // keep track file selection
    addFiles: (state, action: PayloadAction<any>) => {
      state.push(...action.payload);
    },
    removeFiles: (state, action: PayloadAction<any>) => {
      return state.filter((file: any) => file.fileName !== action.payload.fileName)
    },
  }
});

export const { addFiles, removeFiles } = filesSlice.actions;

// Select values from state
export const getFiles = (state: RootState) => state.files;

export default filesSlice.reducer;
