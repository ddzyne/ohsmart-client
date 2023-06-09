import { SelectedFile } from '../../types/Files';
import { SectionType, OptionsType } from '../../types/Metadata';

// Function to convert file blob to Base64 encoded string that can be submitted as JSON
// Not used atm, we submit using Formdata, but leaving it here just in case we need it later on
const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

// Type guards
const isOption = (value: OptionsType | OptionsType[] | string | string[] | undefined | null): value is OptionsType =>
  (value as OptionsType) !== undefined && (value as OptionsType).hasOwnProperty('value');

const isOptionArray = (value: OptionsType | OptionsType[] | string | string[] | undefined | null): value is OptionsType[] =>
  Array.isArray(value as OptionsType[]);

// Value helper function
const getField = (value: OptionsType | OptionsType[] | string | string[] | undefined | null) =>
  isOptionArray(value) ? 
  value.map(v => v.value) :
  isOption(value) ?
  value.value :
  value;

// Function to rearrange the metadata and files info for submission
export const formatFormData = async (metadata: SectionType[], files?: SelectedFile[]) => {
  // First create a FormData object that we will fill
  let formData = new FormData();

  // Format the metadata fields
  const formattedMetadata = metadata.map( section => 
    section.fields.map( field => {
      const fieldValue = {
        name: field.name,
        id: field.id,
        value: getField(field.value),
        private: field.private,
      }
      if (field.type === 'repeatSingleField') {
        return ({
          ...fieldValue,
          value: field.fields.map( repeatableField => repeatableField.value ),
        })
      }
      if (field.type === 'group') {
        return ({
          ...fieldValue,
          value: field.fields.map( fieldArray => 
            Array.isArray(fieldArray) && fieldArray.map( f => 
              ({ 
                name: f.name, 
                id: f.id, 
                value: getField(f.value), 
                private: f.private,
              })
            ) 
          ),
        })
      }
      return fieldValue;
    })
  ).flat();

  // Append metadata fields to FormData object as JSON string
  formData.append('metadata', JSON.stringify(formattedMetadata));

  // Create the file metadata array
  let fileMetadata = Array.isArray(files) && files.map( f => ({
    id: f.id,
    name: f.name,
    lastModified: f.lastModified,
    private: f.private,
    role: f.role,
    process: f.process,
  }));

  // And add it to the FormData
  formData.append('fileMetadata', JSON.stringify(fileMetadata));

  // Add the files, by converting their blob url's back to a js File object and adding them to the FormData
  const fileData = Array.isArray(files) && await Promise.all(
    files.map(f => 
      fetch(f.url)
      .then(r => r.blob())
      // .then(b => toBase64(b))
      .then(d => {
        formData.append(f.id, d);
      })
    )
  );

  return formData;
}