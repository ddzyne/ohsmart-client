import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import formSections from '../../config/formsections';
import type { 
  SetFieldPayload, 
  AddFieldPayload,
  DeleteFieldPayload,
  InitialStateType, 
  SectionType, 
  RepeatTextFieldType,
  RepeatGroupedFieldType,
  InputField,
  TextFieldType
} from '../../types/Metadata';
import { getValid, getStatus, formatInitialState, findById } from './metadataHelpers';
import { v4 as uuidv4 } from 'uuid';

// load the imported form and close all accordion panels by default
const initialState: InitialStateType = {
  form: formatInitialState(formSections) as SectionType[],
  panel: '',
}

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    // keep track of form state
    setField: (state, action: PayloadAction<SetFieldPayload>) => {
      const section = state.form[action.payload.sectionIndex];
      const field = findById(action.payload.id, section.fields);

      // field is found, lets set it
      if (field) {
        field.value = action.payload.value;

        // After every input, we need to update status and section state status as well.
        // Only needed when the new status differs from the old one.
        // Lets set accordion valid/invalid state by calling its reducer with the current input state
        if (getValid(action.payload.value as string, field.validation) !== field.valid) {
          metadataSlice.caseReducers.setSectionStatus(state, action);
          field.valid = getValid(action.payload.value as string, field.validation);
        }
      }
    },
    // functionality for adding new single (repeatable) fields/field groups
    addField: (state, action: PayloadAction<AddFieldPayload>) => {
      const section = state.form[action.payload.sectionIndex];
      const fieldIndex = section.fields.findIndex( f => f.id === action.payload.groupedFieldId);

      if (fieldIndex !== undefined) {
        const newField = action.payload.type === 'single' ?
          {...(section.fields[fieldIndex] as RepeatTextFieldType).fields[0], id: uuidv4(), value: '', valid: ''} :
          (section.fields[fieldIndex] as RepeatGroupedFieldType).fields[0].map( f => ({...f, id: uuidv4(), value: '', valid: ''}));
        // add field to section
        section.fields[fieldIndex].fields = [
          ...(section.fields[fieldIndex] as RepeatGroupedFieldType | RepeatTextFieldType).fields, newField
        ] as InputField[][] | TextFieldType[];
      }
    },
    deleteField: (state, action: PayloadAction<DeleteFieldPayload>) => {
      const section = state.form[action.payload.sectionIndex];
      const fieldIndex = section.fields.findIndex( f => f.id === action.payload.groupedFieldId);

      if (fieldIndex !== undefined) {
        (section.fields[fieldIndex] as RepeatTextFieldType | RepeatGroupedFieldType).fields.splice(action.payload.deleteField, 1);
      }
    },
    // keep track of the accordion state
    setOpenPanel: (state, action: PayloadAction<string>) => {
      state.panel = action.payload;
    },
    setSectionStatus: (state, action: PayloadAction<SetFieldPayload | null>) => {
      if (action.payload) {
        // setting status based on user interaction
        set(action.payload.sectionIndex)
      }
      else {
        // initial setting of status
        Array.from(Array(state.form.length).keys()).forEach( i => set(i) );
      }

      function set(sectionIndex: number) {
        const status = getStatus(undefined,
          state.form[sectionIndex].fields.flatMap(field => {
            if (field.type !== 'group' && field.fields) {
              // this is a single repeatable field
              return field.fields.flatMap( f => getStatus(f));
            }
            if (field.type === 'group' && field.fields) {
              // grouped field, can have either a fields key with a single array as value, or an array of arrays
              return field.fields.flatMap( f => 
                Array.isArray(f) ? 
                f.flatMap( inner => getStatus(inner)) :
                getStatus(f)
              );
            }
            else {
              return getStatus(field);
            }
          })
        );
        state.form[sectionIndex].status = status;
      }
    }
  }
});

export const { setField, setOpenPanel, setSectionStatus, addField, deleteField } = metadataSlice.actions;

// Select values from state
export const getMetadata = (state: RootState) => state.metadata.form;
export const getOpenPanel = (state: RootState) => state.metadata.panel;
export const getMetadataStatus = (state: RootState) => {
  const statusArray = state.metadata.form.map(section => section.status);
  return getStatus(undefined, statusArray);
}

export default metadataSlice.reducer;
