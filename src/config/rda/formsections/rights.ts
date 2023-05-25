const section = {
  id: 'rights',
  title: {
    en: 'Rights, licencing and re-use',
    nl: 'Rechten, licenties en hergebruik',
  },
  fields: [
    {
      type: 'autocomplete',
      label: {
        en: 'Rights holder',
        nl: 'Rechthebbende',
      },
      name: 'rightsHolder',
      required: true,
      multiApiValue: 'orcid',
      options: ['orcid', 'ror'],
    },
    {
      type: 'autocomplete',
      label: {
        en: 'License',
        nl: 'Licentie',
      },
      name: 'license',
      required: true,
      options: [],
    },
  ],
};

export default section;