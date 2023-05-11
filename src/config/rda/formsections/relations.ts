const prefix = "relations";

const section = {
  id: prefix,
  title: {
    en: "Relations",
    nl: "Relaties",
  },
  fields: [
    {
      type: "text",
      label: {
        en: "Related to",
        nl: "Gerelateerd aan",
      },
      name: `${prefix}_relation`,
      required: false,
      repeatable: true,
      description: '',
    },
  ],
};

export default section;