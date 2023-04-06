const prefix = "ohs";

export const section = {
  type: "collapsible",
  title: {
    en: "Oral-history specific",
    nl: "Specifiek voor mondelinge geschiedenis",
  },
  fields: [
    {
      legend: {en: "Interviewee (non-public data)", nl: "Geinterviewde (niet-publieke data)"},
      fields: [
        {
          type: "text",
          label: {
            en: "Initials",
            nl: "Initialen",
          },
          name: `${prefix}_interviewee_initials`,
          required: true,
          col_span: "small",
          private: true,
        },
        {
          type: "text",
          label: {
            en: "Last name",
            nl: "Achtername",
          },
          name: `${prefix}_interviewee_last_name`,
          required: true,
          col_span: "small",
          private: true,
        },
        {
          type: "date",
          label: {
            en: "Date of birth",
            nl: "Geboortedatum",
          },
          name: `${prefix}_interviewee_dob`,
          required: true,
          col_span: "small",
          private: true,
        },
      ]
    },
    {
      // repeatable group
      legend: {en: "Interviewer (non-public data)", nl: "Interviewer (niet-publieke data)"},
      repeatable: true,
      fields: [
        {
          type: "text",
          label: {
            en: "First name",
            nl: "Voornaam",
          },
          name: `${prefix}_interviewer_first_name`,
          required: true,
          col_span: "small",
          private: true,
        },
        {
          type: "text",
          label: {
            en: "Last name",
            nl: "Achtername",
          },
          name: `${prefix}_interviewer_last_name`,
          required: true,
          col_span: "small",
          private: true,
        },
      ],
    },
    {
      // repeatable group
      legend: {en: "Others present (non-public data)", nl: "Andere aanwezigen (niet-publieke data)"},
      repeatable: true,
      fields: [
        {
          type: "text",
          label: {
            en: "First name",
            nl: "Voornaam",
          },
          name: `${prefix}_others_first_name`,
          required: false,
          col_span: "small",
          private: true,
        },
        {
          type: "text",
          label: {
            en: "Last name",
            nl: "Achtername",
          },
          name: `${prefix}_others_last_name`,
          required: false,
          col_span: "small",
          private: true,
        },
        {
          type: "text",
          label: {
            en: "Function",
            nl: "Functie",
          },
          name: `${prefix}_others_function`,
          required: false,
          col_span: "small",
          private: true,
        },
      ],
    },
    {
      type: "typeahead",
      list: ["custom"],
      label: {
        en: "Location of interview",
        nl: "Locatie van interview",
      },
      name: `${prefix}_location`,
      required: true,
      col_span: "medium",
      repeatable: true,
    },
    {
      type: "datetime-local",
      label: {
        en: "Date and time of interview",
        nl: "Datum en tijd van interview",
      },
      name: `${prefix}_date_time_interview`,
      required: true,
      col_span: "medium",
      repeatable: true,
    },
    {
      type: "text",
      label: {
        en: "Recorded by",
        nl: "Opgenomen door",
      },
      name: `${prefix}_recorded_by`,
      required: true,
      col_span: "medium",
      repeatable: true,
    },
    // recording format follows from file upload I'd say
    {
      type: "text",
      label: {
        en: "Recording equipment",
        nl: "Opnameapparatuur",
      },
      name: `${prefix}_recording_equipment`,
      required: false,
      col_span: "medium",
      repeatable: true,
    },
    // transcript by human: should this be here, or in the files section?
    // transcription by machine, should be checkbox?
  ],
};

export default section;