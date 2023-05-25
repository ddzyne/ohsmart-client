const section = {
  id: 'citation',
  title: {
    en: 'Citation',
    nl: 'Aanhalingen',
  },
  fields: [
    {
      type: 'text',
      label:  {
        en: 'Title',
        nl: 'Titel',
      },
      name: 'title',
      required: true,
      description: {
        en: 'The name or title by which the data deposit is known',
        nl: 'Naam of titel van de data deposit',
      },
    },
    {
      type: 'text',
      label: {
        en: 'Subtitle',
        nl: 'Ondertitel',
      },
      name: 'subtitle',
      required: false,
      repeatable: true,
      description: {
        en: 'One or more subtitles for this deposit',
        nl: 'Een of meer ondertitels voor deze data',
      },
    },
    {
      type: 'group',
      label: {
        en: 'Contributors',
        nl: 'Medewerkers',
      },
      name: 'contributorGroup',
      repeatable: true,
      description: {
        en: 'Name and function of authors and contributors',
        nl: 'Naam en functie van auteurs en anderen die bijgedragen hebben',
      },
      fields: [
        {
          type: 'autocomplete',
          label: {
            en: 'Name',
            nl: 'Naam',
          },
          name: 'contributorName',
          required: true,
          description: {
            en: 'Name from the ORCID registry',
            nl: 'Naam uit de ORCID database',
          },
          options: 'orcid',
        },
        {
          type: 'text',
          label: {
            en: 'Function',
            nl: 'Functie',
          },
          name: 'contributorFunction',
          required: true,
          description: {
            en: 'Function of this contributor',
            nl: 'Functie van deze medewerker',
          },
        },
      ]
    },
    {
      type: 'text',
      multiline: true,
      label: {
        en: 'Description',
        nl: 'Beschrijving',
      },
      name: 'description',
      required: true,
      description: {
        en: 'Describe what the data deposit is about',
        nl: 'Beschrijf waarover deze data deposit gaat',
      },
    },
    {
      type: 'autocomplete',
      label: {
        en: 'Publisher',
        nl: 'Uitgever',
      },
      name: 'publisher',
      required: true,
      description: {
        en: 'Institution, often the rights holder',
        nl: 'Organisatie, meestal de rechthebbende',
      },
      options: 'ror',
    },
    {
      type: 'date',
      label: {
        en: 'Publication date',
        nl: 'Datum van publicatie',
      },
      name: 'publicationDate',
      required: true,
      description: {
        en: 'The date of publication of the resource',
        nl: 'De publicatiedatum van deze data',
      },
    },
    {
      // I suppose this is read-only and pre-filled by system. Todo.
      type: 'text',
      label: {
        en: 'Depositor',
        nl: 'Ingediend door',
      },
      name: 'depositor',
      required: true,
      disabled: true,
      description: {
        en: 'Unique to you',
        nl: 'Uniek voor jou',
      },
      value: 'User XXX',
    },
  ],
};

export default section;