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

// Function to rearrange the metadata for submission
export const formatFormData = (sessionId: string, metadata: SectionType[], files?: SelectedFile[]) => {
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

  // Create the file metadata array
  const fileMetadata = Array.isArray(files) && files.map( f => ({
    id: f.id,
    name: f.name,
    lastModified: f.lastModified,
    private: f.private,
    role: f.role,
    process: f.process,
  }));

  return {
    id: sessionId,
    metadata: formattedMetadata,
    fileMetadata: fileMetadata,
  };
}

// Function to create a file for submission
export const formatFormFiles = async (sessionId: string, file: SelectedFile) => {
  // We submit using multipart form data
  let formData = new FormData();

  // Add the files, by converting their blob url's back to a js File object and adding them to the FormData
  const fileData = await fetch(file.url)
    .then(result => result.blob())
    .then(blob => {
      formData.append('file', blob);
      formData.append('fileId', file.id);
      formData.append('formId', sessionId);
    });

  return formData;
}