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
    {
      type: 'radio',
      label: 'Test radio',
      name: 'radiotest',
      description: {
        en: 'Select the language for your data',
        nl: 'Selecteer de taal voor je data',
      },
      options: [
        {label: 'Test1', value: 'test1'},
        {label: 'Test2', value: 'test2'},
        {label: 'test3', value: 'test3'},
        {label: 'test4', value: 'test4'},
      ],
    },
    {
      type: 'check',
      label: 'Test check',
      name: 'checktest',
      required: true,
      description: {
        en: 'Select the language for your data',
        nl: 'Selecteer de taal voor je data',
      },
      options: [
        {label: 'Test1 met een jantjelang label je weet toch blaat die blaat man je weet', value: 'test1'},
        {label: 'Test2', value: 'test2'},
        {label: 'test3', value: 'test3'},
        {label: 'test4', value: 'test4'},
      ],
    },
  ],
};

export default section;