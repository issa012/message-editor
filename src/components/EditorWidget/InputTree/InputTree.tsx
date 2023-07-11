import { useRef } from 'react';
import { Button } from '../../ui/button/button';
import { Textarea } from '../../ui/textarea/textarea';
import styles from './InputTree.module.css';

type InputTreeProps = {
  children: any;
};

const InputTree = ({ children }: InputTreeProps) => {
  if (!children) return null;
  return (
    <>
      {children.map((node: any) => (
        <div className={styles.container}>
          <div>
            <div className={styles.textareaContainer}>
              <span className={styles.chip}>
                <Button>Delete</Button>
                IF
              </span>
              <Textarea value={node.condition} />
            </div>
          </div>
          <div>
            <div className={styles.textareaContainer}>
              <span className={styles.chip}>THEN</span>
              <Textarea value={node.condTrue.value} />
            </div>
            <InputTree children={node.condTrue.children} />
          </div>
          <div>
            <div className={styles.textareaContainer}>
              <span className={styles.chip}>ELSE</span>
              <Textarea value={node.condFalse.value} />
            </div>
            <InputTree children={node.condFalse.children} />
          </div>
          <div className={styles.additional}>
            <div className={styles.textareaContainer}>
              <span className={styles.chip}></span>
              <Textarea value={node.additional.value} />
            </div>
            <InputTree children={node.additional.children} />
          </div>
        </div>
      ))}
    </>
  );
};
export default InputTree;
