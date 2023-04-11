const prefix = "relations";

export const section = {
  title: "Relations",
  id: prefix,
  fields: [
    {
      type: "autocomplete",
      label: "Audience",
      id: `${prefix}_audience`,
      required: false,
      repeatable: true,
      value: '',
      description: 'Discription',
      options: [],
    },
    {
      type: "autocomplete",
      label: "Related to",
      id: `${prefix}_relation`,
      required: false,
      repeatable: true,
      value: '',
      description: 'Discription',
      options: [],
    },
  ],
};

export default section;