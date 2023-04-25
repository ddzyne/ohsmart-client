import { v4 as uuidv4 } from 'uuid';
import type { 
  SectionStatus,
  InputField,
  Field,
  InitialSectionType,
} from '../../types/Metadata';

// Helper functions for the Metadata form

// some simple validation, not fully implemented
export const validateData = (type: string, value: string) => {
  switch (type) {
    case 'email':
      const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return res.test(value.toLowerCase());
    default:
      return;
  }
}

// Recursive function that finds and returns a single field or nothing if not found
// id: field's ID
// fields: an array of fields
export const findById = (id: string, fields: Field[]): Field | undefined => {
  for (let item of fields) {
    if (item.id === id) {
      return item;
    }
    if (item.fields) {
      let result = findById(id, item.fields.flat());
      if (result) {
        return result;
      }
    }
  }
  return;
};

// Simple logic to check the status (color of indicator) for a specific field,
// needed in multiple functions
export const getStatus = (toCheck: InputField | SectionStatus[]) => {
  const check1 = 
    Array.isArray(toCheck) ? toCheck.indexOf('error') !== -1 :
    toCheck.required && (!toCheck.value || toCheck.value.length === 0);
  const check2 = 
    Array.isArray(toCheck) ? toCheck.indexOf('warning') !== -1 :
    !toCheck.required && (!toCheck.value || toCheck.value.length === 0)
  return (
    check1 ?
    'error' : 
    check2 ?
    'warning' :
    'success'
  )
}

// As getStatus, but then check in a field is valid or not
export const getValid = (value: string, validation?: string) => {
  return (
    validation ? 
    validateData(validation, value) : 
    value && value.length !== 0 ? 
    true :
    false
  )
}

/*
Format the initial state loaded from the ./config files
for repeatable fields/fieldgroups functionality.
We also add a unique ID so we can keep track of everything.
Structure we want:
[
  {singlefield},
  {groupfield: fields: [
    {field}, 
    {field},
  ]},
  {repeatSingleField: fields:[
    {repeatablefield}, 
    {repeatablefield},
  ]}, 
  {repeatGroupField: fields: [
    [{field}, {field}],
    [{field}, {field}],
  ]},
]
*/
export const formatInitialState = (form: InitialSectionType[]) => {
  const newForm = form.map( section => ({
    ...section, 
    fields: section.fields.map( field => {
      if( field.repeatable && field.type === 'group' && field.fields ) {
        const newFieldGroup = field.fields.map( f => ({...f, id: uuidv4()}));
        return ({...field, id: uuidv4(), fields: [newFieldGroup] });
      }
      if ( field.repeatable && field.type !== 'group' ) {
        return ({id: uuidv4(), type: 'repeatSingleField', fields: [{...field, id: uuidv4()}]});
      }
      else {
        return {...field, id: uuidv4()};
      }
    })
  }));
  return newForm;
}
