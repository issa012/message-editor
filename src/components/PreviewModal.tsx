import { MyTemplate } from './EditorWidget/EditorWidget';
import Preview from './EditorWidget/Preview/Preview';

import { Button } from './ui/button/button';

import { Modal, ModalContent, ModalTrigger } from './ui/modal/modal';

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
        <Button>Open Preview</Button>
      </ModalTrigger>
      <ModalContent className="preview">
        <Preview arrVarNames={arrVarNames} template={template} />
      </ModalContent>
    </Modal>
  );
};
export default PreviewModal;
