const prefix = "humanities";

export const section = {
  title: "Humanities",
  id: prefix,
  fields: [
    {
      type: "select",
      label: "Domain-specific keywords",
      id: `${prefix}_keywords`,
      required: true,
      repeatable: true,
    },
  ],
};

export default section;