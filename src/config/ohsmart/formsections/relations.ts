const section = {
  id: 'relations',
  title: {
    en: 'Relations',
    nl: 'Relaties',
  },
  fields: [
    {
      type: 'autocomplete',
      label: {
        en: 'Audience',
        nl: 'Publiek',
      },
      name: 'audience',
      required: false,
      multiselect: true,
      description: {
        en: 'Humanities; Arts and Culture; History of Arts and Architecture (for example)',
        nl: 'Bijvoorbeeld geesteswetenschappen, kunst en cultuur, etc.',
      },
      options: ['test1', 'test2'],
    },
    {
      type: 'autocomplete',
      label: {
        en: 'Related to',
        nl: 'Gerelateerd aan',
      },
      name: 'relation',
      required: false,
      multiselect: true,
      description: {
        en: 'Other interviews, publications, projects',
        nl: 'Andere interviews, publicaties, projecten',
      },
      options: ['test1', 'test2'],
    },
  ],
};

export default section;