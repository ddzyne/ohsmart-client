const prefix = 'rda';

const section = {
  id: prefix,
  title: {
    en: "RDA specific",
    nl: "RDA specifiek",
  },
  fields: [
    {
      type: 'text',
      label: {
        en: "Origin",
        nl: "Oorsprong",
      },
      name: `${prefix}_origin`,
      required: true,
      description: {
        en: '',
        nl: '',
      },
    },
  ],
};

export default section;