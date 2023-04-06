const prefix = "rights";

export const section = {
  type: "collapsible",
  title: {
    en: "Rights & licensing",
    nl: "Rechten & licenties",
  },
  fields: [
    {
      type: "typeahead",
      label: {
        en: "Rights holder",
        nl: "Houder rechten",
      },
      name: `${prefix}_rightsholder`,
      required: true,
      col_span: "medium",
      list: ["custom"],
    },
    {
      type: "typeahead",
      label: {
        en: "Licence",
        nl: "Licentie",
      },
      name: `${prefix}_licence_type`,
      required: true,
      col_span: "medium",
      list: ["LICENCES"],
    },
  ],
};

export default section;