import styles from './modal.module.css';
interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ open, setOpen, children }: ModalProps) => {
  return (
    <div className={`${styles.modal} ${open ? styles.show : ''}`} onClick={() => setOpen(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {open ? children : null}
      </div>
    </div>
  );
};
