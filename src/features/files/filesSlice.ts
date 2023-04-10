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
    removeFile: (state, action: PayloadAction<any>) => {
      return state.filter((file: any) => file.fileName !== action.payload.fileName)
    },
    setFileMeta: (state, action: PayloadAction<any>) => {
      // set extra metadata for this file: restricted status, role and processing
      
    }
  }
});

export const { addFiles, removeFile, setFileMeta } = filesSlice.actions;

// Select values from state
export const getFiles = (state: RootState) => state.files;

export default filesSlice.reducer;
