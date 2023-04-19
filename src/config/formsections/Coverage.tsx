import dummyList from '../../data/dummyList.json';

const prefix = "coverage";

export const section = {
  id: prefix,
  title: "Coverage",
  fields: [
    {
      type: "autocomplete",
      label: "Subject location",
      name: `${prefix}_subject_location`,
      required: true,
      multiselect: true,
      description: "The location(s) that the interview material deals with",
      value: '',
      options: dummyList,
    },
    {
      type: "datetime-local",
      label: "Subject time and date",
      name: `${prefix}_subject_date_time`,
      required: true,
      repeatable: true,
      description: "The start and end times that the interview material deals with",
      value: '',
    },
    {
      type: "autocomplete",
      label: "Subject keywords",
      name: `${prefix}_subject_keywords`,
      required: true,
      multiselect: true,
      description: "List of relevant keywords",
      value: '',
      options: dummyList,
    },
  ],
};

export default section;