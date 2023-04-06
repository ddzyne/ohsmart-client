const prefix = "humanities";

export const section = {
  type: "collapsible",
  title: {
    en: "Humanities",
    nl: "Geesteswetenschappen",
  },
  fields: [
    {
      type: "typeahead",
      list: ["custom"],
      label: {
        en: "Domain-specific keywords",
        nl: "Domein-specifieke keywords",
      },
      name: `${prefix}_keywords`,
      required: true,
      col_span: "medium",
      repeatable: true,
    },
  ],
};

export default section;