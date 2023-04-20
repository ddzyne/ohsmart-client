import { v4 as uuidv4 } from 'uuid';
import type { 
  SectionStatus,
  InputField,
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

// Recursive function that finds and returns a single field
// id: field's ID
// fields: an array of fields
export const findById = (id: string, fields: any): InputField | undefined => {
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
export const getStatus = (field?: InputField, statusArray?: SectionStatus[]) => {
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
export const formatInitialState = (form: any) => {
  const newForm = form.map( (section: any) => ({
    ...section, 
    fields: section.fields.map( (field: any) => {
      if( field.repeatable && field.type === 'group' ) {
        const newFieldGroup = field.fields.map( (f: any) => ({...f, id: uuidv4()}));
        return ({...field, id: uuidv4(), fields: [newFieldGroup] });
      }
      if ( field.repeatable && field.type !== 'group' ) {
        return ({id: uuidv4(), type: 'repeatSingleField', fields: [{...field, id: uuidv4()}]});
        // return [{...field, id: uuidv4()}];
      }
      else {
        return {...field, id: uuidv4()};
      }
    })
  }));
  return newForm;
}
