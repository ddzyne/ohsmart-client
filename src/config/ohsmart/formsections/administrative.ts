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
      options: languageList.map( l => ({
        // Copied this list from https://gist.github.com/jrnk/8eb57b065ea0b098d571
        // We relabel the languages for processing in the form and in Dataverse
        // Note that language names at the moment are not translated into Dutch (they should be?)
        label: l.name,
        value: l.code,
      })),
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
        en: 'The person to contact in respect of metadata (curator)',
        nl: 'Contactpersoon voor de metadata (curator)',
      },
      fields: [
        {
          type: 'text',
          label: {
            en: 'Name',
            nl: 'Naam',
          },
          name: 'contact_name', // gets filled in automatically
          disabled: true,
        },
        {
          type: 'text',
          label: {
            en: 'Affiliatie',
            nl: 'Affiliation',
          },
          name: 'contact_affiliation', // gets filled in automatically
          disabled: true,
        },
        {
          type: 'text',
          label: {
            en: 'Email',
            nl: 'Email',
          },
          name: 'contact_email', // gets filled in automatically
          disabled: true,
        },
      ]
    },
  ],
};

export default section;