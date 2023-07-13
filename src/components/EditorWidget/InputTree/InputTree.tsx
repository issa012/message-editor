import { Button } from '../../ui/button/button';
import { Textarea } from '../../ui/textarea/textarea';
import styles from './InputTree.module.css';
import { MyTemplate, Template } from '../EditorWidget';

type InputTreeProps = {
  children: Template[];
  values: MyTemplate;
  setValues: React.Dispatch<React.SetStateAction<MyTemplate>>;
  handleChange?: (id?: number, values?: any) => void;
  path: string;
  handleValuesChange: (path: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDelete: (path: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleFocus: (path: string, e: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
};

const InputTree = ({
  children,
  values,
  setValues,
  path,
  handleValuesChange,
  handleDelete,
  handleFocus,
}: InputTreeProps) => {
  path = path.concat('children');
  return (
    <>
      {children.map((node: Template, id: number) => (
        <div key={path.concat(String(id))} className={styles.container}>
          <div className={styles.textareaContainer}>
            <span className={styles.chip}>
              <Button onClick={(e) => handleDelete(path.concat('.', String(id)), e)}>Delete</Button>
              IF
            </span>
            <Textarea
              value={node.condition}
              name="condition"
              onChange={(e) => handleValuesChange(path.concat('.', String(id)), e)}
              onFocus={(e) => handleFocus(path.concat('.', String(id)), e)}
            />
          </div>
          <div className={styles.textareaContainer}>
            <span className={styles.chip}>THEN</span>
            <Textarea
              value={node.condTrue.value}
              name="condTrue"
              onChange={(e) => handleValuesChange(path.concat('.', String(id)), e)}
              onFocus={(e) => handleFocus(path.concat('.', String(id)), e)}
            />
          </div>
          <InputTree
            children={node.condTrue.children}
            values={values}
            setValues={setValues}
            path={path.concat('.', String(id), '.condTrue.')}
            handleValuesChange={handleValuesChange}
            handleDelete={handleDelete}
            handleFocus={handleFocus}
          />
          <div className={styles.textareaContainer}>
            <span className={styles.chip}>ELSE</span>
            <Textarea
              value={node.condFalse.value}
              name="condFalse"
              onChange={(e) => handleValuesChange(path.concat('.', String(id)), e)}
              onFocus={(e) => handleFocus(path.concat('.', String(id)), e)}
            />
          </div>
          <InputTree
            handleValuesChange={handleValuesChange}
            children={node.condFalse.children}
            values={values}
            setValues={setValues}
            path={path.concat('.', String(id), '.condFalse.')}
            handleDelete={handleDelete}
            handleFocus={handleFocus}
          />
          <div className={styles.additional}>
            <div className={styles.textareaContainer}>
              <span className={styles.chip}></span>
              <Textarea
                value={node.additional.value}
                name="additional"
                onChange={(e) => handleValuesChange(path.concat('.', String(id)), e)}
                onFocus={(e) => handleFocus(path.concat('.', String(id)), e)}
              />
            </div>
            <InputTree
              handleValuesChange={handleValuesChange}
              children={node.additional.children}
              values={values}
              setValues={setValues}
              path={path.concat('.', String(id), '.additional.')}
              handleDelete={handleDelete}
              handleFocus={handleFocus}
            />
          </div>
        </div>
      ))}
    </>
  );
};
export default InputTree;
