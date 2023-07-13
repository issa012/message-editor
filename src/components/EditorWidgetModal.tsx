import EditorWidget, { MyTemplate } from './EditorWidget/EditorWidget';

import { Button } from './ui/button/button';

import { Modal, ModalContent, ModalTrigger } from './ui/modal/modal';

const EditorWidgetModal = ({
  arrVarNames,
  callbackSave,
  template,
}: {
  arrVarNames: string[];
  template: MyTemplate;
  callbackSave: () => Promise<void>;
}) => {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Message Template</Button>
      </ModalTrigger>
      <ModalContent>
        <EditorWidget arrVarNames={arrVarNames} callbackSave={callbackSave} template={template} />
      </ModalContent>
    </Modal>
  );
};
export default EditorWidgetModal;
