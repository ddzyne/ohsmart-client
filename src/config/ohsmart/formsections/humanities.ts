const section = {
  id: 'humanities',
  title: {
    en: 'Humanities',
    nl: 'Geesteswetenschappen',
  },
  fields: [
    {
      type: 'autocomplete',
      label: {
        en: 'Domain-specific keywords',
        nl: 'Domeinspecifieke trefwoorden',
      },
      name: 'domain_specific_keywords',
      required: true,
      multiselect: true,
      value: '',
      description: {
        en: '',
        nl: '',
      },
      options: ['test1', 'test2'],
    },
  ],
};

export default section;