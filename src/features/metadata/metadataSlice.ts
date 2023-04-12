import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import formSections from '../../config/formsections';
import type { 
  FieldSetPayload, 
  FieldType, 
  Field, 
  InitialStateType, 
  FormType, 
  GroupFieldType, 
  TextFieldType, 
  AutoCompleteFieldType 
} from '../../types/Metadata';

// load the imported form and close all accordion panels by default
const initialState: InitialStateType = {
  form: <FormType[]>formSections,
  panel: '',
}

// some simple validation, not fully implemented
function validateData(type: string, value: string) {
  switch (type) {
    case 'email':
      const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return res.test(value.toLowerCase());
    default:
      return;
  }
}

// Recursive function to find this field in the state and update its value.
// This is a bit slow, so if indefinite field depth is not needed, could also update by array index directly in setField reducer
function formatData(items: any, payload: FieldSetPayload) {
  items && items.forEach( (item: any) => {
    if ( item.id === payload.field.id ) {
      item.value = payload.value;
      item.valid = item.validation ? validateData(item.validation, <string>payload.value) : payload.value ? true : false;
      return;
    } else {
      formatData(item.fields, payload);
    }
  });
}

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    // keep track of form state
    // todo: maybe just throw fields into a new state section that has nothing to do with the formsections import
    // so we can add debounce on change, partially uncontrolled inputs, better performance?
    setField: (state, action: PayloadAction<FieldSetPayload>) => {
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
