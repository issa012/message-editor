import { useState } from 'react';
import { Button } from '../../ui/button/button';
import { Textarea } from '../../ui/textarea/textarea';
import styles from './InputTree.module.css';

type InputTreeProps = {
  depth: number;
  className?: string;
  setDepth: React.Dispatch<React.SetStateAction<number>>;
  handleFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  setText: () => void;
  height: number;
};

const InputTree = ({
  depth,
  className,
  setDepth,
  handleFocus,
  height,
  setText,
}: InputTreeProps) => {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const onDelete = () => {
    setDepth(height);
    setText();
  };

  if (depth === 0) return null;
  return (
    <div className={className}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span>IF</span>
          <Button onClick={onDelete}>Delete</Button>
        </div>
        <Textarea onFocus={handleFocus} />
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <span>THEN</span>
        </div>
        <Textarea
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          onFocus={handleFocus}
        />
      </div>
      <InputTree
        handleFocus={handleFocus}
        className={styles.innerTree}
        height={height + 1}
        depth={depth - 1}
        setDepth={setDepth}
        setText={() => {
          setTopText(topText.concat(bottomText));
          setBottomText('');
        }}
      ></InputTree>
      {depth - 1 > 0 ? (
        <div className={styles.container}>
          <div className={styles.left}></div>
          <Textarea
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
      ) : null}
      <div className={styles.container}>
        <div className={styles.left}>
          <span>ELSE</span>
        </div>
        <Textarea onFocus={handleFocus} />
      </div>
    </div>
  );
};
export default InputTree;
