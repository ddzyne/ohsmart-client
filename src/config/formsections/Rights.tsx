const prefix = "rights";

export const section = {
  title: "Rights & licensing",
  id: prefix,
  fields: [
    {
      type: "autocomplete",
      label: "Rights holder",
      id: `${prefix}_rightsholder`,
      required: true,
      value: '',
      description: 'Discription',
      options: [],
    },
    {
      type: "autocomplete",
      label: "Licence",
      id: `${prefix}_licence_type`,
      required: true,
      value: '',
      description: 'Discription',
      options: [],
    },
  ],
};

export default section;