import type { Dispatch, SetStateAction } from 'react';
import type { Language, LanguageStrings } from './Language';

export interface InitialSectionType {
  id: string;
  title: string | LanguageStrings;
  fields: TextFieldType[] | GroupedFieldType[] | AutocompleteFieldType[];
}

export type SectionStatus = 'error' | 'warning' | 'success' | undefined;

export interface SectionType extends Omit<InitialSectionType, 'fields'> {
  fields: Field[];
  status: SectionStatus;
}

export type OptionsType = {
  label: string | LanguageStrings;
  value: string;
  header?: string | LanguageStrings;
  extra?: string[];
  extraLabel?: string;
};

export type Field = TextFieldType | AutocompleteFieldType | GroupedFieldType | RepeatTextFieldType | RadioFieldType | CheckFieldType;
export type InputField = TextFieldType | AutocompleteFieldType | RadioFieldType | CheckFieldType | RepeatTextFieldType;

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
  options?: never;
}

export type Datastations = 'elsst' | 'narcis';
export type TypeaheadAPI = 'orcid' | 'ror' | 'geonames' | 'getty' | 'sheets' | 'dansFormats' | Datastations;

export interface AutocompleteFieldType {
  type: 'autocomplete';
  id: string;
  name: string;
  label: string | LanguageStrings;
  multiselect?: boolean;
  value?: OptionsType | OptionsType[] | null;
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
  sheetOptions?: SheetOptions;
}

interface SheetOptions {
  sheetId: string;
  page: string;
  startAtRow: number;
  labelCol: number;
  valueCol: number;
  headerCol: number;
}

export interface GroupedFieldType {
  type: 'group';
  id: string;
  name: string;
  label: string | LanguageStrings;
  private?: boolean;
  repeatable?: boolean;
  description?: string | LanguageStrings;
  value?: never;
  fields: InputField[] | InputField[][];
  validation?: never;
  valid?: never;
  multiApiValue?: never;
  options?: never;
}

export interface RepeatGroupedFieldType extends Omit<GroupedFieldType, 'fields'> {
  fields: InputField[][];
}

export interface RepeatTextFieldType {
  type: 'repeatSingleField';
  id: string;
  name: string;
  fields: TextFieldType[];
  private?: boolean;
  value?: never;
  validation?: never;
  valid?: never;
  repeatable?: never;
  multiApiValue?: never;
  options?: never;
  required?: never;
}

export interface RadioFieldType {
  type: 'radio';
  id: string;
  name: string;
  label: string | LanguageStrings;
  value?: string;
  valid?: never;
  validation?: never;
  disabled?: boolean;
  description?: string | LanguageStrings;
  required?: never;
  private?: boolean;
  options: OptionsType[];
  multiApiValue?: never;
  fields?: never;
}

export interface CheckFieldType {
  type: 'check';
  id: string;
  name: string;
  label: string | LanguageStrings;
  value: string[];
  valid?: boolean | '';
  validation?: never;
  disabled?: boolean;
  description?: string | LanguageStrings;
  required?: boolean;
  private?: boolean;
  options: OptionsType[];
  multiApiValue?: never;
  fields?: never;
}

export interface AutocompleteAPIFieldData {
  arg?: string;
  response: OptionsType[];
}

// Props for components
export interface SingleFieldProps {
  field: Field;
  sectionIndex: number;
}

export interface GroupedFieldProps extends Omit<SingleFieldProps, 'field'> {
  field: GroupedFieldType;
}

export interface TextFieldProps extends Omit<SingleFieldProps, 'field'> {
  field: TextFieldType;
  groupedFieldId?: string;
  currentField?: number;
  totalFields?: number;
}

export interface RadioFieldProps extends Omit<SingleFieldProps, 'field'> {
  field: RadioFieldType;
}

export interface CheckFieldProps extends Omit<SingleFieldProps, 'field'> {
  field: CheckFieldType;
}

export interface AutocompleteFieldProps extends Omit<SingleFieldProps, 'field'> {
  field: AutocompleteFieldType;
  isLoading?: boolean;
}

export interface AutocompleteAPIFieldProps extends AutocompleteFieldProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  debouncedInputValue: string;
  data?: AutocompleteAPIFieldData;
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

export interface ApiLinkProps {
  link: string;
  apiValue: TypeaheadAPI;
  chip?: boolean;
}

// Payloads and types for redux slices
export interface SetFieldPayload {
  sectionIndex: number;
  id: string;
  value: string | string[] | OptionsType | OptionsType[] | null | ValidationType;
  typeaheadApi?: TypeaheadAPI;
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

export interface InitialStateType {
  id: string;
  form: SectionType[];
  panel: string;
}

// To do
export type ValidationType = 'email';