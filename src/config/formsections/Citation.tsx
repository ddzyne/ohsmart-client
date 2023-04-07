const prefix = 'citation';

export const section = {
  id: prefix,
  title: 'Citation',
  icon: '',
  fields: [
    {
      type: 'group',
      label: 'Title',
      id: `${prefix}_group_title`,
      repeatable: true,
      description: 'Interview [First name] [Last name] over [subject]',
      fields: [
        {
          type: 'text',
          label: 'First name',
          id: `${prefix}_title_first_name`,
          required: true,
          private: true,
        },
        {
          type: 'text',
          label: 'Last name',
          id: `${prefix}_title_last_name`,
          required: true,
          private: true,
        },
        {
          type: 'text',
          label: 'Subject',
          id: `${prefix}_title_subject`,
          required: true,
          private: true,
        },
      ]
    },
    {
      type: 'text',
      label:  'Subtitle',
      id: `${prefix}_subtitle`,
      required: true,
      repeatable: true,
      description: 'Project name or subject/title, important in the case of related interviews',
    },
    {
      type: 'text',
      multiline: true,
      label: 'Description',
      id: `${prefix}_description`,
      required: true,
      description: 'Some context on the interview. What is the role and relevance of the interviewee in the project? What led to the interview being conducted? Summary of what was discussed in the interview, with time breakdown, and describe important events in the interview. Improves discoverability and reusability of the interview data. Briefly describe the setting and atmosphere of the interview to indicate what does not emerge when only the text is read.',
    },
    {
      // todo: 
      // implement DANS schema 
      type: 'select',
      label: 'Subject',
      id: `${prefix}_subject`,
      required: true,
      repeatable: true,
      description: 'Broad Data Station End Use Community or Domain',
    },
    {
      type: 'select',
      label: 'Publisher',
      id: `${prefix}_publisher`,
      required: true,
      list: 'custom',
      description: 'Institution - often the rights holder',
    },
    {
      // I suppose this is read-only and pre-filled by system?
      type: 'text',
      label: 'Depositor',
      id: `${prefix}_depositor`,
      required: true,
      disabled: true,
      value: '',
      description: 'Unique to you',
    },
  ],
};

export default section;