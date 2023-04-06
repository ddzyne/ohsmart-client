const prefix = "relations";

export const section = {
  type: "collapsible",
  title: {
    en: "Relations",
    nl: "Relaties",
  },
  fields: [
    {
      type: "typeahead",
      label: {
        en: "Audience",
        nl: "Publiek",
      },
      name: `${prefix}_audience`,
      required: false,
      col_span: "medium",
      list: ["custom"],
      repeatable: true,
    },
    {
      type: "typeahead",
      label: {
        en: "Related to",
        nl: "Gerelateerd aan",
      },
      name: `${prefix}_relation`,
      required: false,
      col_span: "medium",
      list: ["custom"],
      repeatable: true,
    },
  ],
};

export default section;