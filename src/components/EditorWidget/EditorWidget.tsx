import { useState } from 'react';
import { Textarea } from '../ui/textarea/textarea';
import InputTree from './InputTree/InputTree';
const templateObj = {
  main: '1',
  children: [
    {
      condition: '1',
      condTrue: { value: '2', children: [] },
      condFalse: {
        value: '2',
        children: [
          {
            condition: '3',
            condTrue: { value: '3', children: [] },
            condFalse: { value: '3', children: [] },
            additional: { value: '3', children: [] },
          },
        ],
      },
      additional: { value: '2', children: [] },
    },

    {
      condition: '2',
      condTrue: { value: '2', children: [] },
      condFalse: { value: '2', children: [] },
      additional: { value: '2', children: [] },
    },
  ],
};

const EditorWidget = ({
  arrVarNames,
  callbackSave,
}: {
  arrVarNames: string[];
  template?: string;
  callbackSave: () => Promise<void>;
}) => {
  const [values, setValues] = useState(templateObj);

  return (
    <div>
      <div>
        <h2>Message Template Editor</h2>
        <Textarea value={values.main} />
        <InputTree children={values.children} />
      </div>
    </div>
  );
};
export default EditorWidget;
