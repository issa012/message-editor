import { Root, Trigger, Portal, Overlay, Content, Close, Title } from '@radix-ui/react-dialog';
import styles from './modal.module.css';

export const Modal = ({ children }: { children: React.ReactNode }) => <Root>{children}</Root>;

export const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Portal>
      <Overlay className={styles.overlay} />
      <Content className={styles.content + ' ' + className}>{children}</Content>
    </Portal>
  );
};

export const ModalClose = Close;
export const ModalTrigger = Trigger;
export const ModalTitle = Title;
