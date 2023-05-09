import dummyList from '../../../data/dummyList.json';

const prefix = "relations";

const section = {
  id: prefix,
  title: "Relations",
  fields: [
    {
      type: "autocomplete",
      label: "Audience",
      name: `${prefix}_audience`,
      required: false,
      multiselect: true,
      value: '',
      description: 'Discription',
      options: dummyList,
    },
    {
      type: "autocomplete",
      label: "Related to",
      name: `${prefix}_relation`,
      required: false,
      multiselect: true,
      value: '',
      description: 'Discription',
      options: dummyList,
    },
  ],
};

export default section;