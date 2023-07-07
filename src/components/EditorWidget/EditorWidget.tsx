import { Button } from '../ui/button/button';
import { Textarea } from '../ui/textarea/textarea';
import styles from './EditerWidget.module.css';

import { useRef, useState } from 'react';
import InputTree from './InputTree/InputTree';

const createTemplate: (node: HTMLDivElement) => string[] = (node) => {
  console.log(node);
  let arr: string[] = [];
  arr.push((node.children[0] as HTMLTextAreaElement).value);

  arr.push((node.children[2] as HTMLTextAreaElement).value);

  return [];
};

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
  const [height] = useState(0);
  const treeRef = useRef<HTMLDivElement>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  if (treeRef.current) {
    // createTemplate(treeRef.current);
  }

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
      <Button onClick={() => setDepth((prev) => ++prev)}>[IF-THEN-ELSE]</Button>

      <div ref={treeRef} id="tree">
        <Textarea
          onFocus={handleFocus}
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <InputTree
          handleFocus={handleFocus}
          depth={depth}
          height={height}
          setDepth={setDepth}
          setText={() => {
            setTopText(topText.concat(bottomText));
            setBottomText('');
          }}
        />
        {depth > 0 ? (
          <Textarea
            onFocus={handleFocus}
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
        ) : null}
      </div>
    </div>
  );
};
export default EditorWidget;
