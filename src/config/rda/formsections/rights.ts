const prefix = "rights";

const section = {
  id: prefix,
  title: {
    en: "Rights, licencing and re-use",
    nl: "Rechten, licenties en hergebruik",
  },
  fields: [
    {
      type: "autocomplete",
      label: {
        en: "Rights holder",
        nl: "Rechthebbende",
      },
      name: `${prefix}_holder`,
      required: true,
      multiApiValue: "orcid",
      options: ["orcid", "ror"],
    },
    {
      type: "autocomplete",
      label: {
        en: "Licence",
        nl: "Licentie",
      },
      name: `${prefix}_license`,
      required: true,
      options: [],
    },
  ],
};

export default section;