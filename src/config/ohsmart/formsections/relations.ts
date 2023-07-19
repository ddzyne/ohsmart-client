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
      multiselect: true,
      description: {
        en: 'Humanities; Arts and Culture; History of Arts and Architecture (for example)',
        nl: 'Bijvoorbeeld geesteswetenschappen, kunst en cultuur, etc.',
      },
      options: 'narcis',
    },
    {
      type: 'autocomplete',
      label: {
        en: 'Related to',
        nl: 'Gerelateerd aan',
      },
      name: 'relation',     
      multiselect: true,
      description: {
        en: 'Other interviews, publications, projects',
        nl: 'Andere interviews, publicaties, projecten',
      },
      options: [],
    },
  ],
};

export default section;