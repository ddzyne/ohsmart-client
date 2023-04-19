import languageList from '../../data/languageList.json';

const prefix = 'administrative';

export const section = {
  id: prefix,
  title: 'Administrative',
  fields: [
    {
      type: 'text',
      label: 'Identifier',
      name: `${prefix}_identifier`,
      required: true,
      description: 'Assigned by interviewer, has to be unique by depositor',
      value: '',
    },
    {
      type: 'autocomplete',
      label: 'Language',
      name: `${prefix}_language`,
      required: true,
      description: 'Language of interview',
      value: '',
      options: languageList,
    },
    {
      type: 'date',
      label: 'Date available',
      name: `${prefix}_date_available`,
      required: true,
      description: 'In case of an embargo, else publication date',
      value: '',
    },
  ],
};

export default section;