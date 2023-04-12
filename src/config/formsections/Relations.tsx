import dummyList from '../../data/dummyList.json';

const prefix = "relations";

export const section = {
  id: prefix,
  title: "Relations",
  fields: [
    {
      type: "autocomplete",
      label: "Audience",
      id: `${prefix}_audience`,
      required: false,
      repeatable: true,
      value: '',
      description: 'Discription',
      options: dummyList,
    },
    {
      type: "autocomplete",
      label: "Related to",
      id: `${prefix}_relation`,
      required: false,
      repeatable: true,
      value: '',
      description: 'Discription',
      options: dummyList,
    },
  ],
};

export default section;