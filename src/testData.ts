import { MyTemplate } from './components/EditorWidget/EditorWidget';

type Dataset = { template: MyTemplate; values: Record<string, string>; expected: string };

export const dataset: Dataset[] = [
  {
    template: {
      main: 'Hello {firstname} {lastname}!\n',
      children: [
        {
          condition: '{company}',
          condTrue: {
            value: '{company} is an outstanding company in the industry. ',
            children: [
              {
                condition: '{position}',
                condTrue: {
                  value:
                    "I noticed that you work there as a {position} and thought it wouldn't hurt to reach out so we could share expierences.",
                  children: [],
                },
                condFalse: {
                  value: 'I decided to reach out to connect with people in position like yours.',
                  children: [],
                },
                additional: { value: '', children: [] },
              },
            ],
          },
          condFalse: {
            value: '',
            children: [
              {
                condition: '{position}',
                condTrue: {
                  value:
                    'I do not know much about your company but I have always admired people who work as a {position}',
                  children: [],
                },
                condFalse: {
                  value: 'I am hoping to expand my network by connecting with people.',
                  children: [],
                },
                additional: { value: '', children: [] },
              },
            ],
          },
          additional: { value: '\n\nIt would be have been great to connect!', children: [] },
        },
      ],
    },
    values: {
      firstname: 'John',
      lastname: 'Smith',
      company: 'Google',
      position: 'Software Engineer',
    },
    expected:
      "Hello John Smith!\nGoogle is an outstanding company in the industry. I noticed that you work there as a Software Engineer and thought it wouldn't hurt to reach out so we could share expierences.\n\nIt would be have been great to connect!",
  },
  {
    template: {
      main: 'Hello {firstname} {lastname}!\n',
      children: [
        {
          condition: '{company}',
          condTrue: {
            value: '{company} is an outstanding company in the industry. ',
            children: [
              {
                condition: '{position}',
                condTrue: {
                  value:
                    "I noticed that you work there as a {position} and thought it wouldn't hurt to reach out so we could share expierences.",
                  children: [],
                },
                condFalse: {
                  value: 'I decided to reach out to connect with people in position like yours.',
                  children: [],
                },
                additional: { value: '', children: [] },
              },
            ],
          },
          condFalse: {
            value: '',
            children: [
              {
                condition: '{position}',
                condTrue: {
                  value:
                    'I do not know much about your company but I have always admired people who work as a {position}.',
                  children: [],
                },
                condFalse: {
                  value: 'I am hoping to expand my network by connecting with people.',
                  children: [],
                },
                additional: { value: '', children: [] },
              },
            ],
          },
          additional: { value: '\n\nIt would be have been great to connect!', children: [] },
        },
      ],
    },
    values: {
      firstname: 'John',
      lastname: 'Smith',
      company: '',
      position: 'Software Engineer',
    },
    expected:
      'Hello John Smith!\nI do not know much about your company but I have always admired people who work as a Software Engineer.\n\nIt would be have been great to connect!',
  },
  {
    template: {
      main: 'Hello {firstname} {lastname}!\n',
      children: [
        {
          condition: '{company}',
          condTrue: {
            value: '{company} is an outstanding company in the industry. ',
            children: [
              {
                condition: '{position}',
                condTrue: {
                  value:
                    "I noticed that you work there as a {position} and thought it wouldn't hurt to reach out so we could share expierences.",
                  children: [],
                },
                condFalse: {
                  value: 'I decided to reach out to connect with people in position like yours.',
                  children: [],
                },
                additional: { value: '', children: [] },
              },
            ],
          },
          condFalse: {
            value: '',
            children: [
              {
                condition: '{position}',
                condTrue: {
                  value:
                    'I do not know much about your company but I have always admired people who work as a {position}',
                  children: [],
                },
                condFalse: {
                  value: 'I am hoping to expand my network by connecting with people.',
                  children: [],
                },
                additional: { value: '', children: [] },
              },
            ],
          },
          additional: { value: '\n\nIt would be have been great to connect!', children: [] },
        },
      ],
    },
    values: {
      firstname: 'John',
      lastname: 'Smith',
      company: 'Google',
      position: '',
    },
    expected:
      'Hello John Smith!\nGoogle is an outstanding company in the industry. I decided to reach out to connect with people in position like yours.\n\nIt would be have been great to connect!',
  },
  {
    template: {
      main: 'Hello {firstname} {lastname}!\n',
      children: [
        {
          condition: '{company}',
          condTrue: {
            value: '{company} is an outstanding company in the industry. ',
            children: [
              {
                condition: '{position}',
                condTrue: {
                  value:
                    "I noticed that you work there as a {position} and thought it wouldn't hurt to reach out so we could share expierences.",
                  children: [],
                },
                condFalse: {
                  value: 'I decided to reach out to connect with people in position like yours.',
                  children: [],
                },
                additional: { value: '', children: [] },
              },
            ],
          },
          condFalse: {
            value: '',
            children: [
              {
                condition: '{position}',
                condTrue: {
                  value:
                    'I do not know much about your company but I have always admired people who work as a {position}',
                  children: [],
                },
                condFalse: {
                  value: 'I am hoping to expand my network by connecting with people.',
                  children: [],
                },
                additional: { value: '', children: [] },
              },
            ],
          },
          additional: { value: '\n\nIt would be have been great to connect!', children: [] },
        },
      ],
    },
    values: {
      firstname: 'John',
      lastname: 'Smith',
      company: '',
      position: '',
    },
    expected:
      'Hello John Smith!\nI am hoping to expand my network by connecting with people.\n\nIt would be have been great to connect!',
  },
];
