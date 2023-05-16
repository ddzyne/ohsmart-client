const prefix = "relations";

const section = {
  id: prefix,
  title: "Relations",
  fields: [
    {
      type: "autocomplete",
      label: "Audience",
      name: `${prefix}_audience`,
      required: false,
      multiselect: true,
      value: '',
      description: 'Discription',
      options: [],
    },
    {
      type: "autocomplete",
      label: "Related to",
      name: `${prefix}_relation`,
      required: false,
      multiselect: true,
      value: '',
      description: 'Discription',
      options: [],
    },
  ],
};

export default section;