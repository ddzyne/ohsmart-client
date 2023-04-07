const prefix = 'administrative';

export const section = {
  id: prefix,
  title: 'Administrative',
  icon: '',
  fields: [
    {
      type: 'text',
      label: 'Identifier',
      id: `${prefix}_identifier`,
      required: true,
      description: '',
    },
    {
      type: 'select',
      list: 'languages',
      label: 'Language',
      id: `${prefix}_language`,
      required: true,
      description: '',
    },
    {
      type: 'date',
      label: 'Date available',
      id: `${prefix}_date_available`,
      required: true,
      description: 'In case of an embargo, else publication date',
    },
  ],
};

export default section;