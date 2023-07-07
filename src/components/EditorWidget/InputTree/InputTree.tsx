import { Button } from '../../ui/button/button';
import { Textarea } from '../../ui/textarea/textarea';
import styles from './InputTree.module.css';

type InputTreeProps = {
  depth: number;
  className?: string;
  onDelete: () => void;
  handleFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const InputTree = ({ depth, className, onDelete, handleFocus }: InputTreeProps) => {
  if (depth == 0) return null;

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
        <Textarea onFocus={handleFocus} />
      </div>
      <InputTree
        handleFocus={handleFocus}
        className={styles.innerTree}
        depth={depth - 1}
        onDelete={onDelete}
      ></InputTree>
      {depth - 1 > 0 ? (
        <div className={styles.container}>
          <div className={styles.left}></div>
          <Textarea onFocus={handleFocus} />
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
