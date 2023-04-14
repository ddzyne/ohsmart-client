import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import formSections from '../../config/formsections';
import type { 
  FieldSetPayload, 
  Field, 
  InitialStateType, 
  SectionType, 
} from '../../types/Metadata';

// load the imported form and close all accordion panels by default
const initialState: InitialStateType = {
  form: formSections as SectionType[],
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
// This is a bit slow, so if indefinite field depth is not needed, can also update by array index directly in setField reducer
function formatData(items: any, payload: FieldSetPayload) {
  items && items.forEach( (item: any) => {
    if ( item.id === payload.field.id ) {
      item.value = payload.value;
      item.valid = item.validation ? validateData(item.validation, payload.value as string) : payload.value ? true : false;
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
    setField: (state, action: PayloadAction<FieldSetPayload>) => {
      const section: SectionType = state.form[action.payload.sectionNumber];
      const field: Field = section.fields[action.payload.fieldNumber];

      if (field.fields) {
        const fieldInGroup = (field.fields as Field[]).find( f => f.id === action.payload.fieldId )
        if (fieldInGroup) {
          fieldInGroup.value = action.payload.value;
          fieldInGroup.valid = 
            fieldInGroup.validation ? 
            validateData(fieldInGroup.validation, action.payload.value as string) :
            action.payload.value && action.payload.value.length !== 0 ?
            true :
            false;
        }
      }
      else {
        field.value = action.payload.value;
        field.valid = 
          field.validation ? 
          validateData(field.validation, action.payload.value as string) : 
          action.payload.value && action.payload.value.length !== 0 ? 
          true :
          false;
      }

      metadataSlice.caseReducers.setSectionStatus(state, action);

      // Or do this recursively, bit slower
      // formatData(state.form, action.payload)
    },
    // keep track of the accordion state
    setOpenPanel: (state, action: PayloadAction<string>) => {
      state.panel = action.payload;
    },
    setSectionStatus: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        set(action.payload.sectionNumber)
      }
      else {
        Array.from(Array(state.form.length).keys()).forEach( (i: number) => set(i) );
      }

      function set(number: number) {
        const status = state.form[number].fields.map( (field) => {
          if ( field.type === 'group' ) {
            return field.fields && field.fields.map( (groupedField) => 
              groupedField.required && (!groupedField.value || groupedField.value.length === 0) ?
              'error' :
              !groupedField.required && (!groupedField.value || groupedField.value.length === 0) ?
              'warning' : 
              'success'
            )
          } else {
            return (
              field.required && (!field.value || field.value.length === 0) ?
              'error' : 
              !field.required && (!field.value || field.value.length === 0) ?
              'warning' :
              'success'
            )
          }
        });

        const statusIndicator = 
          status.indexOf('error') !== -1 ? 
          'error' : 
          status.indexOf('warning') !== -1 ? 
          'warning' : 
          'success';

        state.form[number].status = statusIndicator;
      }
    }
  }
});

export const { setField, setOpenPanel, setSectionStatus } = metadataSlice.actions;

// Select values from state
export const getMetadata = (state: RootState) => state.metadata.form;
export const getOpenPanel = (state: RootState) => state.metadata.panel;
export const getMetadataStatus = (state: RootState) => {
  const statusArray = state.metadata.form.map( section => section.status);
  return (
    statusArray.indexOf('error') !== -1 ? 
    'error' : 
    statusArray.indexOf('warning') !== -1 ? 
    'warning' : 
    'success'
  );
}

export default metadataSlice.reducer;
