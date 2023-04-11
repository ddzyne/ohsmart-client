import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import formSections from '../../config/formsections';

// load the imported form and close all accordion panels by default
const initialState: any = {
  form: formSections,
  panel: '',
}

// recursive function to find this field in the state and update its value
function formatData(arr: any, payload: any) {
  arr && arr.forEach((i: any) => {
    if( i.id === payload.field.id ) {
      i.value = payload.value;
      i.touched = true;
    } else {
      formatData(i.fields, payload)
    }
  });
}

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    // keep track of form state
    setField: (state, action: PayloadAction<any>) => {
      formatData(state.form, action.payload)
    },
    // keep track of the accordion state
    setOpenPanel: (state, action: PayloadAction<any>) => {
      state.panel = action.payload;
    }
  }
});

export const { setField, setOpenPanel } = metadataSlice.actions;

// Select values from state
export const getMetadata = (state: RootState) => state.metadata.form;
export const getOpenPanel = (state: RootState) => state.metadata.panel;

export default metadataSlice.reducer;
