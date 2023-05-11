const prefix = 'citation';

const section = {
  id: prefix,
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
      name: `${prefix}_title`,
      required: true,
      description: {
        en: 'Project name or title',
        nl: 'Projectnaam of -titel',
      },
    },
    {
      type: 'text',
      label: {
        en: 'Subtitle',
        nl: 'Ondertitel',
      },
      name: `${prefix}_subtitle`,
      required: false,
      repeatable: true,
      description: {
        en: 'One or more subtitles for this project',
        nl: 'Een of meer ondertitels voor dit project',
      },
    },
    {
      type: 'group',
      label: {
        en: 'Contributors',
        nl: 'Medewerkers',
      },
      name: `${prefix}_contributors_group`,
      repeatable: true,
      description: {
        en: 'Name and function of authors and contributors',
        nl: 'Naam en functie van auteurs en andere medewerkers',
      },
      fields: [
        {
          type: 'autocomplete',
          label: {
            en: 'Name',
            nl: 'Naam',
          },
          name: `${prefix}_contributors_name`,
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
          name: `${prefix}_contributors_function`,
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
      name: `${prefix}_description`,
      required: true,
      description: {
        en: 'Some context on the deposit.',
        nl: 'Context bij deze data',
      },
    },
    {
      type: 'autocomplete',
      label: {
        en: 'Publisher',
        nl: 'Uitgever',
      },
      name: `${prefix}_publisher`,
      required: true,
      description: {
        en: 'Institution - often the rights holder',
        nl: 'Organisatie - meestal de rechthebbende',
      },
      options: 'ror',
    },
    {
      type: 'date',
      label: {
        en: "Publication date",
        nl: "Datum van publicatie",
      },
      name: `${prefix}_publication_date`,
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
      name: `${prefix}_depositor`,
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