import languageList from '../../../data/languageList.json';

const prefix = 'administrative';

const section = {
  id: prefix,
  title: {
    en: "Administrative",
    nl: "Administratief",
  },
  fields: [
    {
      type: 'autocomplete',
      label: {
        en: "Language",
        nl: "Taal",
      },
      name: `${prefix}_language`,
      required: false,
      description: 'Select the language of your metadata',
      options: languageList,
      value: '',
    },
    {
      type: 'date',
      label: {
        en: "Date available",
        nl: "Datum beschikbaar",
      },
      name: `${prefix}_date_available`,
      required: false,
      description: 'In case of an embargo, else publication date',
      value: '',
    },
  ],
};

export default section;