const prefix = "coverage";

const section = {
  id: prefix,
  title: {
    en: "Coverage",
    nl: "Dekking",
  },
  fields: [
    {
      //todo make lookup
      type: "text",
      label: {
        en: "Geolocation",
        nl: "Geografische locatie",
      },
      name: `${prefix}_geolocation`,
      required: false,
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
      // todo make autocomplete
      type: "text",
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
    },
  ],
};

export default section;