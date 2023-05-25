import languageList from '../../global/data/languageList.json';

const section = {
  id: 'administrative',
  title: {
    en: 'Administrative',
    nl: 'Administratief',
  },
  fields: [
    {
      type: 'text',
      label: {
        en: 'Unique identifier',
        nl: 'Unieke id',
      },
      name: 'identifier',
      required: false,
      description: {
        en: 'Provided by Zenodo. Here or in the Eko API?',
        nl: 'Voorzien door Zenodo',
      },
      disabled: true,
      value: 'XXX',
    },
    {
      type: 'autocomplete',
      label: {
        en: 'Language',
        nl: 'Taal',
      },
      name: 'language',
      required: false,
      description: {
        en: 'Select the language for your data',
        nl: 'Selecteer de taal voor je data',
      },
      options: languageList,
    },
    {
      type: 'date',
      label: {
        en: 'Date available',
        nl: 'Datum beschikbaar',
      },
      name: 'dateAvailable',
      required: false,
      description: {
        en: 'The date when the data was or will be made publicly available. If an embargo period has been in effect, use the date when the embargo period ends.',
        nl: 'De datum waarop de data publiek beschikbaar is of is gemaakt. In het geval van een embargoperiode, gebruik de datum waarop deze eindigt.',
      },
    },
  ],
};

export default section;