import { SelectedFile } from '../../types/Files';
import { SectionType, OptionsType } from '../../types/Metadata';

// Function to convert file blob to Base64 encoded string that can be submitted as JSON
const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

// Type guards
const isOption = (value: OptionsType | OptionsType[] | string | undefined | null): value is OptionsType =>
  (value as OptionsType) !== undefined && (value as OptionsType).hasOwnProperty('value');

const isOptionArray = (value: OptionsType | OptionsType[] | string | undefined | null): value is OptionsType[] =>
  Array.isArray(value as OptionsType[]);

// Value helper function
const getField = (value: OptionsType | OptionsType[] | string | undefined | null) =>
  isOptionArray(value) ? 
  value.map(v => v.value) :
  isOption(value) ?
  value.value :
  value;

// Function to rearrange the metadata and files info for submission
export const formatFormData = async (metadata: SectionType[], files?: SelectedFile[]) => {
  // First format the metadata fields
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

  // Add the files, by converting their blob url's back to a js File object and then converting that to a Base64 string
  const fileData = Array.isArray(files) && await Promise.all(
    files.map((f) => 
      fetch(f.url)
      .then(r => r.blob())
      .then(b => toBase64(b))
      .then(d => {
        return ({
          file: d,
          name: f.name,
          private: f.private,
          role: f.role,
          process: f.process,
        })
      })
    )
  );

  return {
    metadata: formattedMetadata,
    files: fileData,
  };
}