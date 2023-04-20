import dummyList from '../../data/dummyList.json';

const prefix = 'citation';

export const section = {
  id: prefix,
  title: 'Citation',
  fields: [
    {
      type: 'group',
      label: 'Title',
      name: `${prefix}_title_group`,
      repeatable: true,
      description: 'Interview with [First name] [Last name] about [subject]',
      fields: [
        {
          type: 'text',
          label: 'First name',
          name: `${prefix}_title_first_name`,
          required: true,
          private: true,
          value: '',
          description: 'Discription',
        },
        {
          type: 'text',
          label: 'Last name',
          name: `${prefix}_title_last_name`,
          required: true,
          private: true,
          value: '',
          description: 'Discription',
        },
        {
          type: 'text',
          label: 'Subject',
          name: `${prefix}_title_subject`,
          required: true,
          private: true,
          value: '',
          description: 'Discription',
        },
      ]
    },
    {
      type: 'text',
      label:  'Subtitle',
      name: `${prefix}_subtitle`,
      required: true,
      repeatable: true,
      description: 'Project name or subject/title, important in the case of related interviews',
      value: '',
    },
    {
      type: 'text',
      multiline: true,
      label: 'Description',
      name: `${prefix}_description`,
      required: true,
      description: 'Some context on the interview. What is the role and relevance of the interviewee in the project? What led to the interview being conducted? Summary of what was discussed in the interview, with time breakdown, and describe important events in the interview. Improves discoverability and reusability of the interview data. Briefly describe the setting and atmosphere of the interview to indicate what does not emerge when only the text is read.',
      value: '',
    },
    {
      // todo: 
      // implement DANS schema 
      type: 'autocomplete',
      label: 'Subject',
      name: `${prefix}_subject`,
      required: true,
      multiselect: true,
      description: 'Broad Data Station End Use Community or Domain',
      value: '',
      options: dummyList,
    },
    {
      type: 'autocomplete',
      label: 'Publisher',
      name: `${prefix}_publisher`,
      required: true,
      list: 'custom',
      description: 'Institution - often the rights holder',
      value: '',
      options: 'ror',
    },
    {
      // I suppose this is read-only and pre-filled by system?
      type: 'text',
      label: 'Depositor',
      name: `${prefix}_depositor`,
      required: true,
      disabled: true,
      description: 'Unique to you',
      value: 'User XXX',
    },
  ],
};

export default section;