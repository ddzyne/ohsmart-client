import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import formSections from '../../config/formsections';
import type { 
  FieldSetPayload, 
  Field, 
  InitialStateType, 
  SectionType, 
  SectionStatus,
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

function getStatus(field?: Field, statusArray?: SectionStatus[]) {
  const check1 = 
    statusArray ? statusArray.indexOf('error') !== -1 :
    field && field.required && (!field.value || field.value.length === 0);
  const check2 = 
    statusArray ? statusArray.indexOf('warning') !== -1 :
    field && !field.required && (!field.value || field.value.length === 0)
  return (
    check1 ?
    'error' : 
    check2 ?
    'warning' :
    'success'
  )
}

function getValid(value: string, validation?: string) {
  return (
    validation ? 
    validateData(validation, value) : 
    value && value.length !== 0 ? 
    true :
    false
  )
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
          fieldInGroup.valid = getValid(action.payload.value as string, fieldInGroup.validation);
        }
      }
      else {
        field.value = action.payload.value;
        field.valid = getValid(action.payload.value as string, field.validation);
      }

      // Or do this recursively, slower
      // formatData(state.form, action.payload)

      // set accordion valid/invalid state
      metadataSlice.caseReducers.setSectionStatus(state, action);
    },
    // functionality for adding new single (repeatable) textfields 
    addField: (state, action: PayloadAction<any>) => {
      console.log(action)
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
        const statusArray: SectionStatus[] = state.form[number].fields.map( (field) => {
          if ( field.type === 'group' ) {
            return field.fields.map( (groupedField) => getStatus(groupedField))
          } else {
            return getStatus(field, undefined)
          }
        }).flat();
        const status = getStatus(undefined, statusArray);
        state.form[number].status = status;
      }
    }
  }
});

export const { setField, setOpenPanel, setSectionStatus, addField } = metadataSlice.actions;

// Select values from state
export const getMetadata = (state: RootState) => state.metadata.form;
export const getOpenPanel = (state: RootState) => state.metadata.panel;
export const getMetadataStatus = (state: RootState) => {
  const statusArray = state.metadata.form.map(section => section.status);
  return getStatus(undefined, statusArray);
}

export default metadataSlice.reducer;
