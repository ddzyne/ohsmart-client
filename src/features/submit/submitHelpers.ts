import { SelectedFile } from '../../types/Files';
import { SectionType, OptionsType } from '../../types/Metadata';

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
export const formatFormData = async (sessionId: string, metadata: SectionType[], files?: SelectedFile[]) => {
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

  // Submit files individually using multipart form data
  // Convert file blob url's back to a js File object and add them to a FormData object
  // Add FormData to the file array
  const fileData = Array.isArray(files) && await Promise.all(
    files.map(file => 
      fetch(file.url)
      .then(result => result.blob())
      .then(blob => {
        let formData = new FormData();
        formData.append('file', blob);
        formData.append('fileName', file.name);
        formData.append('fileId', file.id);
        formData.append('metadataId', sessionId);
        return formData;
      })
    )
  );

  return {
    metadata: {
      id: sessionId,
      metadata: formattedMetadata,
      "file-metadata": fileMetadata,
    },
    files: fileData,
  };
}