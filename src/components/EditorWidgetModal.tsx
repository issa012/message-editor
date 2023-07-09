import EditorWidget from './EditorWidget/EditorWidget';

import { Button } from './ui/button/button';

import { Modal, ModalContent, ModalTrigger } from './ui/modal/modal';

const EditorWidgetModal = ({
  arrVarNames,
  callbackSave,
}: {
  arrVarNames: string[];
  template?: string;
  callbackSave: () => Promise<void>;
}) => {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Message Template</Button>
      </ModalTrigger>
      <ModalContent>
        <EditorWidget arrVarNames={arrVarNames} callbackSave={callbackSave} />
      </ModalContent>
    </Modal>
  );
};
export default EditorWidgetModal;
