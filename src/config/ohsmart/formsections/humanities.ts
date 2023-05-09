import dummyList from '../../../data/dummyList.json';

const prefix = "humanities";

const section = {
  id: prefix,
  title: "Humanities",
  fields: [
    {
      type: "autocomplete",
      label: "Domain-specific keywords",
      name: `${prefix}_keywords`,
      required: true,
      multiselect: true,
      value: '',
      description: 'Discription',
      options: dummyList,
    },
  ],
};

export default section;