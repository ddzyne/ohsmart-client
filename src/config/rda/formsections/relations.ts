import interestGroups from '../data/interestGroups.json';
import workingGroups from '../data/workingGroups.json';

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
        en: 'Related to',
        nl: 'Gerelateerd aan',
      },
      name: 'relation',
      required: false,
      description: {
        en: 'Select other PIDs, publications, projects related to this deposit',
        nl: 'Selecteer andere PIDs, publicaties, projecten gerelateerd aan deze data',
      },
      multiselect: true,
      options: [...workingGroups.map( g => ({header: 'Working group', ...g})), ...interestGroups.map( g => ({header: 'Interest group', ...g}))],
    },
  ],
};

export default section;