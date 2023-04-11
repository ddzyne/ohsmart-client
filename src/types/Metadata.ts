export interface FormType {
  id: string;
  title: string;
  icon: string,
  fields: Field[];
}

// note we use autocomplete for every selectbox
type FieldType = 'text' | 'datetime-local' | 'date' | 'checkbox' | 'radiobutton' | 'autocomplete' | 'group';

type OptionsType = {
  label: string;
  value: string;
};

// split into field types, todo
export interface Field {
  type: FieldType;
  id: string;
  label: string;
  value: string;
  repeatable?: boolean;
  valid?: boolean;
  disabled?: boolean;
  touched?: boolean;
  multiline?: boolean;
  description?: string;
  required?: boolean;
  private?: boolean;
  fields?: Field[];
  options?: any;
}

export interface FieldProps {
  field: Field;
  sectionNumber: number;
  fieldNumber: number;
}