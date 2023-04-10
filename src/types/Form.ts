export interface FormType {
  id: string;
  title: string;
  icon: string,
  fields: Field[];
}

export interface Field {
  type: string;
  id: string;
  label: string;
  repeatable: boolean;
  value: string;
  multiline?: boolean;
  description?: string;
  required?: boolean;
  private?: boolean;
  fields?: Field[];
}
