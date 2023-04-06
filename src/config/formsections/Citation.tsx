const prefix = 'citation';

export const section = {
  id: prefix,
  title: 'Citation',
  icon: '',
  fields: [
    {
      type: 'group',
      label: 'Title (non-public data)',
      repeatable: true,
      description: '',
      fields: [
        {
          type: 'text',
          label: 'First name',
          id: `${prefix}_title_first_name`,
          required: true,
          private: true,
          description: '',
        },
        {
          type: 'text',
          label: 'Last name',
          id: `${prefix}_title_last_name`,
          required: true,
          private: true,
          description: '',
        },
        {
          type: 'text',
          label: 'Subject',
          id: `${prefix}_title_subject`,
          required: true,
          private: true,
          description: '',
        },
      ]
    },
    {
      type: 'text',
      label:  'Subtitle',
      id: `${prefix}_subtitle`,
      required: true,
      repeatable: true,
      description: '',
    },
    {
      type: 'textarea',
      label: 'Description',
      id: `${prefix}_description`,
      required: true,
      description: '',
    },
    {
      // todo: 
      // implement DANS schema 
      type: 'select',
      label: 'Subject',
      id: `${prefix}_subject`,
      required: true,
      repeatable: true,
      description: '',
    },
    {
      type: 'select',
      label: 'Publisher',
      id: `${prefix}_publisher`,
      required: true,
      list: 'custom',
      description: '',
    },
    {
      // I suppose this is read-only and pre-filled by system?
      type: 'text',
      label: 'Depositor',
      id: `${prefix}_depositor`,
      required: true,
      disabled: true,
      value: '',
      description: '',
    },
  ],
};

export default section;