const prefix = "rights";

export const section = {
  title: "Rights & licensing",
  id: prefix,
  fields: [
    {
      type: "select",
      label: "Rights holder",
      id: `${prefix}_rightsholder`,
      required: true,
      value: '',
    },
    {
      type: "select",
      label: "Licence",
      id: `${prefix}_licence_type`,
      required: true,
      value: '',
    },
  ],
};

export default section;