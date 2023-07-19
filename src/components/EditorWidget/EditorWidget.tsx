import { useEffect, useRef, useState } from 'react';
import { Textarea } from '../ui/textarea/textarea';
import InputTree from './InputTree/InputTree';
import { Button } from '../ui/button/button';
import PreviewModal from '../PreviewModal';
import styles from './EditerWidget.module.css';

export type Template = {
  condition: string;
  condTrue: { value: string; children: Array<Template> };
  condFalse: { value: string; children: Array<Template> };
  additional: { value: string; children: Array<Template> };
};

export type MyTemplate = {
  value: string;
  children: Template[];
};

const EditorWidget = ({
  arrVarNames,
  callbackSave,
  template,
  onClose,
}: {
  arrVarNames: string[];
  template?: MyTemplate;
  callbackSave: () => Promise<void>;
  onClose: () => void;
}) => {
  const [values, setValues] = useState<MyTemplate>(template || { value: '', children: [] });
  const mainRef = useRef<HTMLTextAreaElement>(null);

  const [lastElement, setLastElement] = useState<{
    path: string;
    target: HTMLTextAreaElement | null;
  }>({
    path: 'children',
    target: mainRef.current,
  });

  function handleValuesChange(path: string, e: React.ChangeEvent<HTMLTextAreaElement>) {
    const pathId = path.split('.');

    // create copy of the values object.
    const copy = JSON.parse(JSON.stringify(values));
    let curr = copy;

    // Get the reference to the current object using pathId. pathId contains the path to the current obj.
    // Other functions operate similarly
    for (let i = 0; i < pathId.length; i++) {
      curr = curr[pathId[i]];
    }
    // change the value of the current object
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
    for (let i = 0; i < pathId.length - 2; i++) {
      curr = curr[pathId[i]];
    }
    let referenceToParent = curr;
    console.log(curr);
    let removed = curr.children.splice(pathId.at(-1), 1);
    console.log(removed);
    if (+pathId[pathId.length - 1] > 0) {
      console.log(referenceToParent, pathId);
      referenceToParent = referenceToParent.children[+pathId[pathId.length - 1] - 1].additional;
    }
    referenceToParent.value = referenceToParent.value.concat(removed[0].additional.value);

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
        if (!curr[pathId[i]]) return;
        curr = curr[pathId[i]];
      }
    }

    const newVal = target.value
      .slice(0, target.selectionStart)
      .concat('{', varName, '}', target.value.slice(target.selectionStart));

    if (target.name === 'value' || target.name === 'condition') {
      curr[target.name] = newVal;
    } else {
      curr[target.name].value = newVal;
    }
    target.focus();
    setValues(copy);
  }

  function handleAddElement(path: string, target: HTMLTextAreaElement) {
    if (target.name === 'condition') return;

    const pathId = path.split('.');

    const copy = JSON.parse(JSON.stringify(values));

    const newObj = {
      condition: '',
      condTrue: { value: '', children: [] },
      condFalse: { value: '', children: [] },
      additional: { value: target.value.slice(target.selectionStart), children: [] },
    };

    if (target.name === 'value') {
      copy.value = copy.value.slice(0, target.selectionStart);
      copy.children.unshift(newObj);
      setValues(copy);
      return;
    }

    let curr = copy;
    for (let i = 0; i < pathId.length - 1; i++) {
      curr = curr[pathId[i]];
    }
    if (target.name === 'additional') {
      let index = pathId[pathId.length - 1];

      curr.splice(index + 1, 0, newObj);
      curr[index][target.name].value = curr[index][target.name].value.slice(
        0,
        target.selectionStart
      );
      setValues(copy);
      return;
    }

    curr = curr[pathId[pathId.length - 1]];
    curr[target.name].value = curr[target.name].value.slice(0, target.selectionStart);
    curr[target.name].children.unshift(newObj);

    target.focus();
    setValues(copy);
  }
  // Set the first textarea as the last element after render.
  useEffect(() => {
    setLastElement({ path: '', target: mainRef.current });
  }, []);

  // console.log(values);
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Message Template Editor</h1>
        <div>
          {arrVarNames.map((varName) => (
            <Button
              key={varName}
              onClick={() => handleAddVariableClick(lastElement.path, lastElement.target!, varName)}
            >{`{${varName}}`}</Button>
          ))}
        </div>
        <div>
          <Button onClick={() => handleAddElement(lastElement.path, lastElement.target!)}>
            IF | THEN | ELSE
          </Button>
        </div>
        <Textarea
          minRows={5}
          value={values.value}
          name="value"
          ref={mainRef}
          onChange={(e) => setValues({ ...values, value: e.target.value })}
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
      <div className={styles.controls}>
        <Button onClick={() => callbackSave()}>Save</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
      <PreviewModal template={values} arrVarNames={arrVarNames} />
    </div>
  );
};
export default EditorWidget;
