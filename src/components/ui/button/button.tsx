import * as React from 'react';
import styles from './button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return <button className={`${styles.btn} ${className}`} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button };
