import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SelectedFile, ReduxFileActions } from '../../types/Files';

// load the imported form and close all accordion panels by default
const initialState: any[] = []

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    // keep track file selection
    addFiles: (state, action: PayloadAction<SelectedFile[]>) => {
      state.push(...action.payload);
    },
    removeFile: (state, action: PayloadAction<SelectedFile>) => {
      return state.filter((file: any) => file.fileName !== action.payload.fileName)
    },
    setFileMeta: (state, action: PayloadAction<ReduxFileActions>) => {
      // set extra metadata for this file: restricted status, role and processing
      const file = state.find( (file: SelectedFile) => file.fileName === action.payload.fileName);
      console.log(action.payload)
      if (file) {
        file[action.payload.type] = action.payload.value
      }
    }
  }
});

export const { addFiles, removeFile, setFileMeta } = filesSlice.actions;

// Select values from state
export const getFiles = (state: RootState) => state.files;

export default filesSlice.reducer;
