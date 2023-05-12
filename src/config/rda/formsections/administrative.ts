import languageList from '../../global/data/languageList.json';

const prefix = 'administrative';

const section = {
  id: prefix,
  title: {
    en: "Administrative",
    nl: "Administratief",
  },
  fields: [
    {
      type: 'text',
      label: {
        en: "Unique identifier",
        nl: "Unieke id",
      },
      name: `${prefix}_id`,
      required: false,
      description: {
        en: 'Provided by Zenodo',
        nl: 'Voorzien door Zenodo',
      },
      disabled: true,
      value: 'XXX',
    },
    {
      type: 'autocomplete',
      label: {
        en: "Language",
        nl: "Taal",
      },
      name: `${prefix}_language`,
      required: false,
      description: {
        en: 'Select the language for your deposit',
        nl: 'Selecteer de taal voor je data',
      },
      options: languageList,
    },
    {
      type: 'date',
      label: {
        en: "Date available",
        nl: "Datum beschikbaar",
      },
      name: `${prefix}_date_available`,
      required: false,
      description: {
        en: 'In case of an embargo, else publication date',
        nl: 'Embargodatum, of anders publicatiedatum',
      },
    },
  ],
};

export default section;