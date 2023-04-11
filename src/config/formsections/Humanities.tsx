const prefix = "humanities";

export const section = {
  title: "Humanities",
  id: prefix,
  fields: [
    {
      type: "autocomplete",
      label: "Domain-specific keywords",
      id: `${prefix}_keywords`,
      required: true,
      repeatable: true,
      value: '',
      description: 'Discription',
      options: [],
    },
  ],
};

export default section;