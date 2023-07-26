import { v4 as uuidv4 } from 'uuid';
import type { 
  SectionStatus,
  InputField,
  Field,
  InitialSectionType,
  SectionType,
  ValidationType,
} from '../../types/Metadata';

// Helper functions for the Metadata form

// some simple validation, not fully implemented
export const validateData = (type: ValidationType, value: string): boolean => {
  switch (type) {
    case 'email':
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.toLowerCase());
    case 'uri':
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.toLowerCase());
    default:
      return true;
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

// Simple logic to check the status (color of indicator) for a specific field, needed in multiple functions
// Can be error, warning, success
// TODO this is a bit of a mess and doesn't really work well with fields that have validation
export const getStatus = (toCheck: InputField | SectionStatus[]): SectionStatus => {
  const check1 = 
    Array.isArray(toCheck) ? 
    // check if array, then it's a section
    toCheck.indexOf('error') !== -1 :
    // otherwise it's a field
    (toCheck.required && (!toCheck.value || (Array.isArray(toCheck.value) && toCheck.value.length === 0))) || 
    (toCheck.hasOwnProperty('validation') && toCheck.hasOwnProperty('valid') && toCheck.valid === false && toCheck.value !== '');
  const check2 = 
    Array.isArray(toCheck) ? 
    toCheck.indexOf('warning') !== -1 :
    !toCheck.required && (!toCheck.value || (Array.isArray(toCheck.value) && toCheck.value.length === 0));

  !Array.isArray(toCheck) && console.log(`${toCheck.value} - c1: ${check1} - c2: ${check2}`)

  return (
    check1 ?
    'error' : 
    check2 ?
    'warning' :
    'success'
  )
}

// Check if a field conforms to validation type specified
export const getValid = (value: string, validation?: ValidationType): boolean => {
  if (validation) {
    return validateData(validation, value);
  }
  else if (value && value.length !== 0) { 
    return true;
  }
  return false;
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
      if( field.type === 'group' && field.fields ) {
        const newFieldGroup = field.fields.map( f => (
          !Array.isArray(f) && f.type === 'text' && f.repeatable ? 
          {
            id: uuidv4(), 
            type: 'repeatSingleField', 
            name: f.name, 
            private: f.private, 
            fields: [{...f, id: uuidv4()}]} :
          {...f, id: uuidv4()}
        ));
        return ({
          ...field, 
          id: uuidv4(), 
          fields: !field.repeatable ? newFieldGroup : [newFieldGroup]
        });
      }
      if ( field.repeatable ) {
        return ({
          id: uuidv4(), 
          type: 'repeatSingleField', 
          name: field.name, 
          private: field.private, 
          fields: [{...field, id: uuidv4()}]});
      }
      else {
        return {...field, id: uuidv4()};
      }
    })
  }));
  return newForm as SectionType[];
}
