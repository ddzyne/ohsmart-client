import dummyList from '../../data/dummyList.json';

const prefix = "humanities";

export const section = {
  id: prefix,
  title: "Humanities",
  fields: [
    {
      type: "autocomplete",
      label: "Domain-specific keywords",
      id: `${prefix}_keywords`,
      required: true,
      repeatable: true,
      value: '',
      description: 'Discription',
      options: dummyList,
    },
  ],
};

export default section;