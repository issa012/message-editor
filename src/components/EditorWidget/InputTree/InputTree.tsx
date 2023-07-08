import { useRef } from 'react';
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
  className = '',
  setDepth,
  handleFocus,
  height,
  setText,
}: InputTreeProps) => {
  const topTextarea = useRef<HTMLTextAreaElement>(null);
  const bottomTextarea = useRef<HTMLTextAreaElement>(null);

  const onDelete = () => {
    setText();
    setDepth(height);
  };

  if (depth === 0) return null;
  return (
    <div className={`${className} ${styles.wrapper}`}>
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
        <Textarea ref={topTextarea} onFocus={handleFocus} />
      </div>
      <InputTree
        handleFocus={handleFocus}
        className={styles.innerTree}
        height={height + 1}
        depth={depth - 1}
        setDepth={setDepth}
        setText={() => {
          if (topTextarea.current && bottomTextarea.current) {
            topTextarea.current.value = topTextarea.current.value.concat(
              bottomTextarea.current.value
            );
            bottomTextarea.current.value = '';
          }
        }}
      ></InputTree>
      {depth - 1 > 0 ? (
        <div className={styles.container}>
          <div className={styles.left}></div>
          <Textarea ref={bottomTextarea} onFocus={handleFocus} />
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
