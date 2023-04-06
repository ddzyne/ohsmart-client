const prefix = "coverage";

export const section = {
  title: "Coverage",
  fields: [
    {
      type: "select",
      label: "Subject location",
      name: `${prefix}_subject_location`,
      required: true,
      repeatable: true,
    },
    {
      type: "datetime-local",
      label: "Subject time and date",
      name: `${prefix}_subject_date_time`,
      required: true,
      repeatable: true,
    },
    {
      type: "select",
      label: "Date available",
      name: `${prefix}_subject_keywords`,
      required: true,
      repeatable: true,
    },
  ],
};

export default section;