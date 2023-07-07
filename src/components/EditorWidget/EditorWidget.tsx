import { Button } from '../ui/button/button';
import { Textarea } from '../ui/textarea/textarea';
import styles from './EditerWidget.module.css';

import { useRef, useState } from 'react';
import InputTree from './InputTree/InputTree';

const variables = ['firstname', 'lastname', 'company', 'position'];

const tree = {
  ifCond: '{company}',
  ifTrue: 'I know you work at {company}',
  child: {
    ifCond: '{position}',
    ifTrue: 'as {position}',
    child: {
      ifCond: '',
      ifTrue: '',
      child: {},
      ifFalse: '',
    },
    ifFalse: '',
  },
  ifFalse: '',
};

const EditorWidget = ({
  arrVarNames,
  template,
  callbackSave,
}: {
  arrVarNames: string[];
  template?: string;
  callbackSave: () => Promise<void>;
}) => {
  const [lastElement, setLastElement] = useState<HTMLTextAreaElement | null>(null);
  const [depth, setDepth] = useState(1);
  const treeRef = useRef(null);
  console.log(treeRef);

  const handleAddVariable = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (lastElement) {
      const startPos = lastElement.selectionStart;
      const prevValue = lastElement.value;
      lastElement.value =
        prevValue.slice(0, startPos) +
        e.currentTarget.value +
        prevValue.slice(startPos, lastElement.value.length);
      lastElement.focus();
      lastElement.selectionStart = startPos + e.currentTarget.value.length;
      lastElement.selectionEnd = startPos + e.currentTarget.value.length;
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setLastElement(e.target);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Message template editor</h1>
      <div className={styles.buttonGroup}>
        {variables.map((variable) => {
          return (
            <Button
              onClick={handleAddVariable}
              key={variable}
              value={`{${variable}}`}
            >{`{${variable}}`}</Button>
          );
        })}
      </div>
      <Button onClick={() => setDepth((prev) => ++prev)}>[IF-THEN-ELSE]</Button>

      <div ref={treeRef} id="tree">
        <Textarea onFocus={handleFocus} />
        <InputTree
          handleFocus={handleFocus}
          depth={depth}
          onDelete={() => setDepth((prev) => --prev)}
        ></InputTree>
        {depth > 0 ? <Textarea onFocus={handleFocus} /> : null}
      </div>
    </div>
  );
};
export default EditorWidget;
