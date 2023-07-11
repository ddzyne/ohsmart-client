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
      name: 'rightsholder',
      required: true,
      description: {
        en: 'Name of the organisation or individual(s) owning the work',
        nl: 'Naam van de organisatie of personen die eigenaar zijn van het werk',
      },
      multiApiValue: 'orcid',
      options: ['ror', 'orcid'],
    },
    {
      type: 'autocomplete',
      label: {
        en: 'Licence',
        nl: 'Licentie',
      },
      name: 'licence_type',
      required: true,
      description: {
        en: 'One of a number of specific licences',
        nl: 'Eén of meerdere specifieke licenties',
      },
      options: ['test1', 'test2'],
    },
  ],
};

export default section;