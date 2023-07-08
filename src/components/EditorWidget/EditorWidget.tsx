import { useRef, useState } from 'react';

import { Button } from '../ui/button/button';
import { Textarea } from '../ui/textarea/textarea';
import styles from './EditerWidget.module.css';
import InputTree from './InputTree/InputTree';
import { generateMessage, generateTemplate } from '../../utils';

const EditorWidget = ({
  arrVarNames,
  callbackSave,
}: {
  arrVarNames: string[];
  template?: string;
  callbackSave: () => Promise<void>;
}) => {
  const [lastElement, setLastElement] = useState<HTMLTextAreaElement | null>(null);
  const [depth, setDepth] = useState(2);

  const treeRef = useRef<HTMLDivElement>(null);
  const topTextarea = useRef<HTMLTextAreaElement>(null);
  const bottomTextarea = useRef<HTMLTextAreaElement>(null);
  const testObj = { firstname: 'Yeldar', lastname: 'Issa' };
  setTimeout(() => {
    if (treeRef.current)
      console.log(generateMessage(generateTemplate(treeRef.current, depth), testObj));
  });

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
        {arrVarNames.map((varName) => {
          return (
            <Button
              onClick={handleAddVariable}
              key={varName}
              value={`{${varName}}`}
            >{`{${varName}}`}</Button>
          );
        })}
      </div>
      <div>
        <Button onClick={() => setDepth((prev) => ++prev)}>[IF-THEN-ELSE]</Button>
      </div>

      <div ref={treeRef} className={styles.tree}>
        <Textarea onFocus={handleFocus} ref={topTextarea} />
        <InputTree
          handleFocus={handleFocus}
          depth={depth}
          height={0}
          setDepth={setDepth}
          setText={() => {
            if (topTextarea.current && bottomTextarea.current) {
              topTextarea.current.value = topTextarea.current.value.concat(
                bottomTextarea.current.value
              );
              bottomTextarea.current.value = '';
            }
          }}
        />
        {depth > 0 ? <Textarea onFocus={handleFocus} ref={bottomTextarea} /> : null}
      </div>
      <div className={styles.controls}>
        <Button>Preview</Button>
        <Button>Save</Button>
        <Button>Close</Button>
      </div>
    </div>
  );
};
export default EditorWidget;
