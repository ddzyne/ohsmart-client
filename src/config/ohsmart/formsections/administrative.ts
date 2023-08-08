import languageList from '../../global/data/languageList.json';

const section = {
  id: 'administrative',
  title: {
    en: 'Administrative',
    nl: 'Administratief',
  },
  fields: [
    {
      type: 'autocomplete',
      label: {
        en: 'Language',
        nl: 'Taal',
      },
      name: 'language',
      required: true,
      description: {
        en: 'Language of interview',
        nl: 'Taal van het interview',
      },
      options: languageList,
    },
    {
      type: 'date',
      format: 'DD-MM-YYYY',
      label:  {
        en: 'Date available',
        nl: 'Datum beschikbaarheid',
      },
      name: 'date_available',
      required: true,
      description:  {
        en: 'In case of an embargo, else publication date',
        nl: 'In het geval van een embargo, anders publicatiedatum',
      },
    },
    {
      type: 'group',
      label: {
        en: 'Contact information',
        nl: 'Contactinformatie',
      },
      name: 'contact',
      description: {
        en: 'The person to contact regarding the metadata (curator)',
        nl: 'Contactpersoon voor de metadata (curator)',
      },
      fields: [
        {
          type: 'text',
          label: {
            en: 'Name',
            nl: 'Naam',
          },
          name: 'contact_name',
          value: 'User name',
          disabled: true,
        },
        {
          type: 'text',
          label: {
            en: 'Affiliation',
            nl: 'Affiliatie',
          },
          name: 'contact_affiliation',
          value: 'User affiliation',
          disabled: true,
        },
        {
          type: 'text',
          label: {
            en: 'Email',
            nl: 'Email',
          },
          name: 'contact_email',
          value: 'user@email.org',
          disabled: true,
        },
      ]
    },
  ],
};

export default section;