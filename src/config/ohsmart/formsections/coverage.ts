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
        en: 'Interview subject location',
        nl: 'Locatie onderwerp interview',
      },
      name: 'subject_location',
      required: true,
      multiselect: true,
      description: {
        en: 'The location(s) that the interview material deals with',
        nl: 'De locatie(s) waar het interview over gaat',
      },
      options: 'geonames',
    },
    {
      type: 'group',
      label: {
        en: 'Date and time',
        nl: 'Datum en tijd',
      },
      name: 'subject_date_time',
      repeatable: true,
      description: {
        en: 'The dates and times the interview material deals with',
        nl: 'De data en tijden waarover het interview gaat',
      },
      fields: [
        {
          type: 'datetime-local',
          label: {
            en: 'Subject start time and date',
            nl: 'Starttijd van het onderwerp',
          },
          name: 'subject_date_time_start',
          required: true,
          description: {
            en: 'The start time that the interview material deals with',
            nl: 'Starttijd van het onderwerp waar het interview over gaat',
          },
        },
        {
          type: 'datetime-local',
          label: {
            en: 'Subject end time and date',
            nl: 'Eindtijd van het onderwerp',
          },
          name: 'subject_date_time_start',         
          description: {
            en: 'The end time that the interview material deals with',
            nl: 'Eindtijd van het onderwerp waar het interview over gaat',
          },
        },
      ],
    },
    {
      type: 'autocomplete',
      label: {
        en: 'Subject keywords',
        nl: 'Trefwoorden bij onderwerp',
      },
      name: 'subject_keywords',
      required: true,
      multiselect: true,
      description: {
        en: 'List of relevant keywords: Audiovisual-specific',
        nl: 'Een lijst van audiovisueelspecifieke relevante trefwoorden',
      },
      options: 'getty',
    },
  ],
};

export default section;