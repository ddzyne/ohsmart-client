import type { Dispatch, SetStateAction } from 'react';

export type SectionStatus = 'error' | 'warning' | 'success' | undefined;

export interface SectionType {
  id: string;
  title: string;
  fields: Field[];
  status?: SectionStatus;
}

// note we use autocomplete for every selectbox
export type FieldType = 'text' | 'datetime-local' | 'date' | 'checkbox' | 'radiobutton' | 'autocomplete' | 'group';

export type OptionsType = {
  label: string;
  value: string;
};

export type Field = TextFieldType | AutocompleteFieldType | GroupedFieldType | RepeatTextFieldType;
export type InputField = TextFieldType | AutocompleteFieldType;

export interface RepeatTextFieldType {
  type: 'repeatSingleField';
  id: string;
  fields: TextFieldType[];
}

export interface TextFieldType {
  type: 'text' | 'datetime-local' | 'date' | 'number';
  id: string;
  name: string;
  label: string;
  validation?: 'email' | 'number';
  maxValue?: number;
  minValue?: number; 
  value?: string;
  repeatable?: boolean;
  valid?: boolean | '';
  disabled?: boolean;
  multiline?: boolean;
  description?: string;
  required?: boolean;
  private?: boolean;
  fields?: never;
}

type TypeaheadAPI = 'orcid' | 'ror';

export interface AutocompleteFieldType {
  type: 'autocomplete';
  id: string;
  name: string;
  label: string;
  multiselect?: boolean;
  value?: any;
  description?: string;
  required?: boolean;
  private?: boolean;
  options: OptionsType[] | TypeaheadAPI;
  valid?: boolean | '';
  disabled?: boolean;
  validation?: never;
  fields?: never;
}

export interface GroupedFieldType {
  type: 'group';
  id: string;
  name: string;
  label: string;
  repeatable?: boolean;
  description?: string;
  fields: InputField[] | InputField[][];
}

export interface RepeatGroupedFieldType extends Omit<GroupedFieldType, 'fields'> {
  fields: InputField[][];
}

export interface SingleFieldProps {
  field: Field;
  sectionIndex: number;
}

export interface GroupedFieldProps {
  field: GroupedFieldType;
  sectionIndex: number;
}

export interface SingleTextFieldProps {
  field: TextFieldType;
  sectionIndex: number;
  groupedFieldId?: string;
  currentField?: number;
  totalFields?: number;
}

export interface AutocompleteFieldProps {
  field: AutocompleteFieldType;
  sectionIndex: number;
}

export interface AutocompleteAPIFieldProps extends AutocompleteFieldProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  debouncedInputValue: string;
  data: any;
  isLoading: boolean;
  isFetching: boolean;
}

interface FieldButtonProps {
  sectionIndex: number;
  groupedFieldId: string;
  size?: 'small' | 'medium' | 'large';
}

export interface DeleteFieldButtonProps extends FieldButtonProps {
  deleteFieldIndex: number;
}

export interface AddFieldButtonProps extends FieldButtonProps {
  type: 'single' | 'group';
}

export interface SetFieldPayload {
  sectionIndex: number;
  id: string;
  value: string | string[] | null;
};

export interface AddFieldPayload {
  sectionIndex: number;
  groupedFieldId: string;
  type: 'single' | 'group';
};

export interface DeleteFieldPayload {
  sectionIndex: number;
  groupedFieldId: string;
  deleteField: number;
};

export type InitialStateType = {
  form: SectionType[];
  panel: string;
}