import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SelectedFile, FileActions, ReduxFileActions, FileActionType } from '../../types/Files';

const initialState: SelectedFile[] = []

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    // keep track file selection
    addFiles: (state, action: PayloadAction<SelectedFile[]>) => {
      state.push(...action.payload);
    },
    removeFile: (state, action: PayloadAction<SelectedFile>) => {
      return state.filter((file: SelectedFile) => file.id !== action.payload.id)
    },
    setFileMeta: (state, action: PayloadAction<ReduxFileActions>) => {
      // set extra metadata for this file: restricted status, role and processing
      const file = state.find( (file: SelectedFile) => file.id === action.payload.id);

      if (file) {
        switch (action.payload.type) {
          // keep typescript happy...
          case 'restricted':
            file.restricted = action.payload.value as boolean;
            break;
          case 'role':
            file.role = action.payload.value as FileActions;
            break;
          case 'process':
            file.process = action.payload.value as FileActions[];
            break;
          default:
            break;
        }
      }
    },
    resetFiles: (state) => {
      return state = initialState;
    }
  }
});

export const { addFiles, removeFile, setFileMeta, resetFiles } = filesSlice.actions;

// Select values from state
export const getFiles = (state: RootState) => state.files;

export default filesSlice.reducer;
