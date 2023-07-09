import * as React from 'react';

import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import styles from './textarea.module.css';

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ ...props }, ref) => {
    return <TextareaAutosize className={`${styles.textarea}`} ref={ref} {...props} minRows={2} />;
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
