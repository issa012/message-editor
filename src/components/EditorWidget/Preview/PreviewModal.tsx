import styles from './PreviewModal.module.css';

import { Textarea } from '../../ui/textarea/textarea';
import { generateMessage } from '../../../utils';
import { Input } from '../../ui/input/input';
import { useState } from 'react';

const Preview = ({ template, arrVarNames }: { template: any; arrVarNames: string[] }) => {
  const [inputValues, setInputValues] = useState(() => {
    return arrVarNames.reduce((acc, current) => {
      acc[current] = '';
      return acc;
    }, {} as Record<string, string>);
  });

  const handleChange = (varName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [varName]: e.target.value });
  };

  if (!template) return null;
  let message = generateMessage(template, inputValues);

  return (
    <div className={styles.container}>
      <h1>Message Preview</h1>
      <div>
        <Textarea disabled value={message} />
      </div>

      <div>
        <p>Variables</p>
        {arrVarNames.map((varName) => (
          <Input label={varName} value={inputValues[varName]} onChange={handleChange(varName)} />
        ))}
      </div>
    </div>
  );
};
export default Preview;
