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
      options: 'sheets',
      sheetOptions: {
        sheetId: '1NWXsxfC8Oq99Po1E2NoIIyTGe-4IGOCcW1LiFljnIcM',
        page: 'Groups API',
        startAtRow: 1,
        labelCol: 2,
        valueCol: 3,
        headerCol: 0,
      }
    },
  ],
};

export default section;