import type { Dispatch, SetStateAction } from 'react';
import type { Language, LanguageStrings } from './Language';

export type SectionStatus = 'error' | 'warning' | 'success' | undefined;

export interface SectionType {
  id: string;
  title: string | LanguageStrings;
  fields: Field[];
  status?: SectionStatus;
}

export interface InitialSectionType {
  id: string;
  title: string;
  fields: InitialField[];
}

export interface InitialField {
  type: FieldType;
  name: string;
  label: string | LanguageStrings;
  validation?: 'email' | 'number';
  maxValue?: number;
  minValue?: number; 
  value?: string;
  repeatable?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  description?: string | LanguageStrings;
  required?: boolean;
  private?: boolean;
  fields?: InitialField[];
}

// note we use autocomplete for every selectbox
export type FieldType = 'text' | 'datetime-local' | 'date' | 'checkbox' | 'radiobutton' | 'autocomplete' | 'group';

export type OptionsType = {
  label: string | LanguageStrings;
  value: string;
  header?: string | LanguageStrings;
};

export type Field = TextFieldType | AutocompleteFieldType | GroupedFieldType | RepeatTextFieldType;
export type InputField = TextFieldType | AutocompleteFieldType;

export interface TextFieldType {
  type: 'text' | 'datetime-local' | 'date' | 'number';
  id: string;
  name: string;
  label: string | LanguageStrings;
  validation?: 'email' | 'number';
  maxValue?: number;
  minValue?: number; 
  value?: string;
  repeatable?: boolean;
  valid?: boolean | '';
  disabled?: boolean;
  multiline?: boolean;
  description?: string | LanguageStrings;
  required?: boolean;
  private?: boolean;
  fields?: never;
  multiApiValue?: never;
}

export type TypeaheadAPI = 'orcid' | 'ror' | 'geonames';

export interface AutocompleteFieldType {
  type: 'autocomplete';
  id: string;
  name: string;
  label: string | LanguageStrings;
  multiselect?: boolean;
  value?: any;
  description?: string | LanguageStrings;
  required?: boolean;
  private?: boolean;
  options: OptionsType[] | TypeaheadAPI[] | TypeaheadAPI;
  valid?: boolean | '';
  disabled?: boolean;
  validation?: never;
  fields?: never;
  repeatable?: never;
  multiApiValue?: TypeaheadAPI;
}

export interface GroupedFieldType {
  type: 'group';
  id: string;
  name: string;
  label: string | LanguageStrings;
  repeatable?: boolean;
  description?: string | LanguageStrings;
  value?: never;
  fields: InputField[] | InputField[][];
  validation?: never;
  valid?: never;
  multiApiValue?: never;
}

export interface RepeatGroupedFieldType extends Omit<GroupedFieldType, 'fields'> {
  fields: InputField[][];
}

export interface RepeatTextFieldType {
  type: 'repeatSingleField';
  id: string;
  fields: TextFieldType[];
  value?: never;
  validation?: never;
  valid?: never;
  repeatable?: never;
  multiApiValue?: never;
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
  mt?: number;
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
  value: string | string[] | TypeaheadAPI | null;
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