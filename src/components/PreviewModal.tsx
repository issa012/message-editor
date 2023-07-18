import { useState } from 'react';
import { MyTemplate } from './EditorWidget/EditorWidget';
import Preview from './EditorWidget/Preview/Preview';

import { Button } from './ui/button/button';
import { Modal } from './ui/modal/modal';

const PreviewModal = ({
  arrVarNames,

  template,
}: {
  arrVarNames: string[];
  template: MyTemplate;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Preview</Button>

      <Modal open={open} setOpen={setOpen}>
        <Preview arrVarNames={arrVarNames} template={template} />
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
};
export default PreviewModal;
