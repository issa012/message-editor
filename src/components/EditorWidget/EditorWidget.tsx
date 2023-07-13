import { useState } from 'react';
import { Textarea } from '../ui/textarea/textarea';
import InputTree from './InputTree/InputTree';
import { Button } from '../ui/button/button';

export type Template = {
  condition: string;
  condTrue: { value: string; children: Array<Template> };
  condFalse: { value: string; children: Array<Template> };
  additional: { value: string; children: Array<Template> };
};

export type MyTemplate = {
  main: string;
  children: Template[];
};

const templateObj: MyTemplate = {
  main: '1',
  children: [
    {
      condition: '2',
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
  const [values, setValues] = useState<MyTemplate>(templateObj);

  const [lastElement, setLastElement] = useState<{ path: string; target?: HTMLTextAreaElement }>({
    path: 'children',
  });

  function handleValuesChange(path: string, e: React.ChangeEvent<HTMLTextAreaElement>) {
    const pathId = path.split('.');
    const copy = JSON.parse(JSON.stringify(values));
    let curr = copy;
    for (let i = 0; i < pathId.length; i++) {
      curr = curr[pathId[i]];
    }
    if (e.target.name === 'condition') {
      curr.condition = e.target.value;
    } else {
      curr[e.target.name].value = e.target.value;
    }
    setValues(copy);
  }

  function handleDelete(path: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const pathId = path.split('.');
    const copy = JSON.parse(JSON.stringify(values));
    let curr = copy;
    for (let i = 0; i < pathId.length - 1; i++) {
      curr = curr[pathId[i]];
    }
    curr.splice(pathId.at(-1), 1);
    setValues(copy);
  }

  function handleFocus(path: string, e: React.ChangeEvent<HTMLTextAreaElement>) {
    setLastElement({ path: path, target: e.target });
  }

  function handleAddVariableClick(path: string, target: HTMLTextAreaElement, varName: string) {
    const pathId = path.split('.');
    const copy = JSON.parse(JSON.stringify(values));

    let curr = copy;
    for (let i = 0; i < pathId.length; i++) {
      if (pathId[i]) {
        curr = curr[pathId[i]];
      }
    }
    const newVal = target.value
      .slice(0, target.selectionStart)
      .concat('{', varName, '}', target.value.slice(target.selectionStart));

    if (target.name === 'condition' || target.name === 'main') {
      curr[target.name] = newVal;
    } else {
      curr[target.name].value = newVal;
    }
    setValues(copy);
  }

  function handleAddElement(path: string) {
    const copy = JSON.parse(JSON.stringify(values));

    setValues(copy);
  }

  return (
    <div>
      <div>
        <h2>Message Template Editor</h2>
        <div>
          {arrVarNames.map((varName) => (
            <Button
              key={varName}
              onClick={() => handleAddVariableClick(lastElement.path, lastElement.target!, varName)}
            >{`{${varName}}`}</Button>
          ))}
        </div>

        <Textarea
          value={values.main}
          name="main"
          onChange={(e) => setValues({ ...values, main: e.target.value })}
          onFocus={(e) => handleFocus('', e)}
        />
        <InputTree
          children={values.children}
          values={values}
          setValues={setValues}
          path=""
          handleValuesChange={handleValuesChange}
          handleDelete={handleDelete}
          handleFocus={handleFocus}
        />
      </div>
    </div>
  );
};
export default EditorWidget;
