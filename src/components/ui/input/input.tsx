import * as React from 'react';
import styles from './input.module.css';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type, label, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <label>{label}</label>
        <input type={type} className={`${styles.input} ${className}`} ref={ref} {...props} />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
