const prefix = "coverage";

const section = {
  id: prefix,
  title: {
    en: "Coverage",
    nl: "Dekking",
  },
  fields: [
    {
      type: "autocomplete",
      label: {
        en: "Geolocation",
        nl: "Geografische locatie",
      },
      name: `${prefix}_geolocation`,
      required: false,
      multiselect: true,
      options: 'geonames',
      description: {
        en: "Select one or more locations",
        nl: "Selecteer één of meerdere locaties",
      },
    },
    {
      type: "datetime-local",
      label: {
        en: "Start date and time",
        nl: "Startdatum en -tijd",
      },
      name: `${prefix}_date_time`,
      required: false,
      description: {
        en: "The start and end times that the deposit deals with",
        nl: "De tijdsperiode waarover de data gaat",
      },
    },
    {
      type: "autocomplete",
      label: {
        en: "Keywords",
        nl: "Trefwoorden",
      },
      name: `${prefix}_keywords`,
      required: true,
      description: {
        en: "Select one or more applicable keywords",
        nl: "Selecteer één of meerdere trefwoorden",
      },
      multiselect: true,
      options: [],
    },
    {
      type: "autocomplete",
      label: {
        en: "RDA spefific keywords",
        nl: "Trefwoorden specifiek voor RDA",
      },
      name: `${prefix}_rda_keywords`,
      required: true,
      description: {
        en: "Select one or more applicable keywords",
        nl: "Selecteer één of meerdere trefwoorden",
      },
      multiselect: true,
      options: [],
    },
  ],
};

export default section;