const prefix = "rights";

export const section = {
  id: prefix,
  title: "Rights & licensing",
  fields: [
    {
      type: "autocomplete",
      label: "Rights holder",
      name: `${prefix}_rightsholder`,
      required: true,
      value: '',
      description: 'Discription',
      options: 'orcid',
    },
    {
      type: "autocomplete",
      label: "Licence",
      name: `${prefix}_licence_type`,
      required: true,
      value: '',
      description: 'Discription',
      options: [],
    },
  ],
};

export default section;