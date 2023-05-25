const section = {
  id: 'coverage',
  title: {
    en: 'Coverage',
    nl: 'Dekking',
  },
  fields: [
    {
      type: 'autocomplete',
      label: {
        en: 'Geographical location',
        nl: 'Geografische locatie',
      },
      name: 'geoLocation',
      required: false,
      multiselect: true,
      options: 'geonames',
      description: {
        en: 'Select one or more locations that the material deals with',
        nl: 'Selecteer één of meerdere locaties waar de data mee te maken heeft',
      },
    },
    {
      type: 'group',
      label: {
        en: 'Start and end times',
        nl: 'Start en eindtijden',
      },
      name: 'startEndDateTimeGroup',
      repeatable: true,
      description: {
        en: 'The start and end times that the interview deals with',
        nl: 'De start- en eindtijdtijden waar het interview over gaat',
      },
      fields: [
        {
          type: 'datetime-local',
          label: {
            en: 'Start date and time',
            nl: 'Startdatum en -tijd',
          },
          name: 'startDateTime',
          required: false,
          description: {
            en: 'Enter the start date and time',
            nl: 'Voer de startdatum en -tijd in',
          },
        },
        {
          type: 'datetime-local',
          label: {
            en: 'End date and time',
            nl: 'Einddatum en -tijd',
          },
          name: 'endDateTime',
          required: false,
          description: {
            en: 'Enter the end date and time',
            nl: 'Voer de einddatum en -tijd in',
          },
        },
      ],
    },
    {
      type: 'autocomplete',
      label: {
        en: 'Keywords',
        nl: 'Trefwoorden',
      },
      name: 'keywords',
      required: true,
      description: {
        en: 'Select one or more applicable keywords',
        nl: 'Selecteer één of meerdere trefwoorden',
      },
      multiselect: true,
      options: [],
    },
    {
      type: 'autocomplete',
      label: {
        en: 'RDA spefific keywords',
        nl: 'Trefwoorden specifiek voor RDA',
      },
      name: 'rdaKeywords',
      required: true,
      description: {
        en: 'Select one or more applicable keywords',
        nl: 'Selecteer één of meerdere trefwoorden',
      },
      multiselect: true,
      options: [],
    },
  ],
};

export default section;