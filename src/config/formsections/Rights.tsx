import dummyList from '../../data/dummyList.json';

const prefix = "rights";

export const section = {
  id: prefix,
  title: "Rights & licensing",
  fields: [
    {
      type: "autocomplete",
      label: "Rights holder",
      name: `${prefix}_rightsholder`,
      required: true,
      value: '',
      description: 'Discription',
      options: dummyList,
    },
    {
      type: "autocomplete",
      label: "Licence",
      name: `${prefix}_licence_type`,
      required: true,
      value: '',
      description: 'Discription',
      options: dummyList,
    },
  ],
};

export default section;