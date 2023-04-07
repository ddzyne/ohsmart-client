const prefix = "coverage";

export const section = {
  title: "Coverage",
  id: prefix,
  fields: [
    {
      type: "select",
      label: "Subject location",
      id: `${prefix}_subject_location`,
      required: true,
      repeatable: true,
      description: "The location(s) that the interview material deals with",
    },
    {
      type: "datetime-local",
      label: "Subject time and date",
      id: `${prefix}_subject_date_time`,
      required: true,
      repeatable: true,
      description: "The start and end times that the interview material deals with",
    },
    {
      type: "select",
      label: "Date available",
      id: `${prefix}_subject_keywords`,
      required: true,
      repeatable: true,
      description: "List of relevant keywords",
    },
  ],
};

export default section;