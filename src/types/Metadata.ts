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
  extraLabel?: string;
  extraContent?: string;
  idLabel?: string;
  id?: string;
  mandatory?: boolean;
  freetext?: boolean;
};

export type Field = TextFieldType | DateFieldType| AutocompleteFieldType | GroupedFieldType | RepeatTextFieldType | RadioFieldType | CheckFieldType;
export type InputField = TextFieldType | DateFieldType | AutocompleteFieldType | RadioFieldType | CheckFieldType | RepeatTextFieldType;

interface BasisFieldType {
  id: string;
  name: string;
  label: string | LanguageStrings;
  touched: boolean;
  placeholder?: string;
  validation?: ValidationType;
  value?: string;
  repeatable?: boolean;
  valid?: boolean | '';
  disabled?: boolean;
  description?: string | LanguageStrings;
  required?: boolean;
  private?: boolean;
}

export interface TextFieldType extends BasisFieldType {
  type: 'text' | 'number';
  maxValue?: number;
  minValue?: number; 
  multiline?: boolean;
  format?: never;
  fields?: never;
  multiApiValue?: never;
  options?: never;
}

export type DateTimeFormat = 'DD-MM-YYYY HH:mm' | 'DD-MM-YYYY' | 'MM-YYYY' | 'YYYY';

export interface DateFieldType extends BasisFieldType {
  type: 'date';
  format: DateTimeFormat;
  formatOptions?: DateTimeFormat[];
  minDate?: string;
  maxDate?: string;
  validation?: never;
  fields?: never;
  multiApiValue?: never;
  options?: never;
}

export type Datastations = 'elsst' | 'narcis';
export type TypeaheadAPI = 'orcid' | 'ror' | 'geonames' | 'getty' | 'sheets' | 'dansFormats' | Datastations;

export interface AutocompleteFieldType extends Omit<BasisFieldType, 'value' | 'repeatable'> {
  type: 'autocomplete';
  multiselect?: boolean;
  value?: OptionsType | OptionsType[] | null;
  options: OptionsType[] | TypeaheadAPI[] | TypeaheadAPI;
  allowFreeText?: boolean;
  multiApiValue?: TypeaheadAPI;
  sheetOptions?: SheetOptions;
  repeatable?: never;
  fields?: never;
  format?: never;
}

interface SheetOptions {
  sheetId: string;
  page: string;
  startAtRow: number;
  labelCol: number;
  valueCol: number;
  headerCol: number;
}

export interface GroupedFieldType extends Omit<BasisFieldType, 'value' | 'touched'> {
  type: 'group';
  fields: InputField[] | InputField[][];
  value?: never;
  validation?: never;
  valid?: never;
  multiApiValue?: never;
  options?: never;
  format?: never;
  touched?: never;
}

export interface RepeatGroupedFieldType extends Omit<GroupedFieldType, 'fields'> {
  fields: InputField[][];
}

export interface RepeatTextFieldType extends Omit<BasisFieldType, 'value' | 'validation' | 'valid' | 'repeatable' | 'touched'> {
  type: 'repeatSingleField';
  fields: TextFieldType[];
  value?: never;
  validation?: never;
  valid?: never;
  repeatable?: never;
  multiApiValue?: never;
  options?: never;
  required?: never;
  format?: never;
  touched?: never;
}

export interface RadioFieldType extends Omit<BasisFieldType, 'validation' | 'valid' | 'required'> {
  type: 'radio';
  layout?: 'row';
  options: OptionsType[];
  valid?: never;
  validation?: never;
  required?: never;
  multiApiValue?: never;
  fields?: never;
  format?: never;
}

export interface CheckFieldType extends Omit<BasisFieldType, 'value' | 'validation' | 'valid'> {
  type: 'check';
  value: string[];
  options: OptionsType[];
  validation?: never;
  valid?: never;
  multiApiValue?: never;
  fields?: never;
  format?: never;
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

export interface DateFieldProps extends Omit<SingleFieldProps, 'field'> {
  field: DateFieldType;
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

export interface SectionStatusPayload {
  sectionIndex: number;
}

export interface InitialStateType {
  id: string;
  form: SectionType[];
  panel: string;
  tab: number;
}

export interface InitialFormType {
  metadata: SectionType[];
  id?: string;
  'file-metadata'?: any;
}

export interface InitialFormProps {
  form: InitialFormType;
}

// To do
export type ValidationType = 'email' | 'uri' | 'number';