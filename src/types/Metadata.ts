export interface FormType {
  id: string;
  title: string;
  fields: Field[];
}

// note we use autocomplete for every selectbox
export type FieldType = 'text' | 'datetime-local' | 'date' | 'checkbox' | 'radiobutton' | 'autocomplete' | 'group';

export type OptionsType = {
  label: string;
  value: string;
};

export type Field = TextFieldType | AutoCompleteFieldType | GroupFieldType;

export interface TextFieldType {
  type: 'text' | 'datetime-local' | 'date' | 'number';
  id: string;
  label: string;
  validation?: boolean | 'email' | 'number';
  maxValue?: number;
  minValue?: number; 
  value?: string;
  repeatable?: boolean;
  valid?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  description?: string;
  required?: boolean;
  private?: boolean;
  fields?: never;
  options?: never;
}

export interface GroupFieldType {
  type: 'group';
  id: string;
  label: string;
  validation?: never;
  maxValue?: never;
  minValue?: never; 
  value?: never;
  repeatable?: boolean;
  valid?: never;
  disabled?: never;
  multiline?: never;
  description?: string;
  required?: never;
  private?: never;
  fields: AutoCompleteFieldType[] | TextFieldType[];
  options?: never;
}

export interface AutoCompleteFieldType {
  type: 'autocomplete';
  id: string;
  label: string;
  validation?: never;
  maxValue?: never;
  minValue?: never; 
  value?: string | string[] | null;
  repeatable?: boolean;
  valid?: boolean;
  disabled?: boolean;
  multiline?: never;
  description?: string;
  required?: boolean;
  private?: boolean;
  fields?: never;
  options?: OptionsType[] | any;
}

export interface FieldProps {
  field: Field;
  sectionNumber: number;
  fieldNumber: number;
}

export interface FieldSetPayload {
  sectionNumber: number;
  fieldNumber: number;
  field: TextFieldType | AutoCompleteFieldType;
  value: string | string[] | null;
};

export type InitialStateType = {
  form: FormType[];
  panel: string;
}