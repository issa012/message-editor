import { MyTemplate } from './EditorWidget/EditorWidget';
import Preview from './EditorWidget/Preview/Preview';

import { Button } from './ui/button/button';

import { Modal, ModalClose, ModalContent, ModalTrigger } from './ui/modal/modal';

const PreviewModal = ({
  arrVarNames,

  template,
}: {
  arrVarNames: string[];
  template: MyTemplate;
}) => {
  return (
    <Modal>
      <ModalTrigger asChild>
        <div className="controls">
          <Button>Open Preview</Button>
        </div>
      </ModalTrigger>
      <ModalContent className="preview">
        <Preview arrVarNames={arrVarNames} template={template} />
        <ModalClose>Close</ModalClose>
      </ModalContent>
    </Modal>
  );
};
export default PreviewModal;
