import { useState } from 'react';
import EditorWidget, { MyTemplate } from './EditorWidget/EditorWidget';

import { Button } from './ui/button/button';
import { Modal } from './ui/modal/modal';

const EditorWidgetModal = ({
  arrVarNames,
  callbackSave,
  template,
}: {
  arrVarNames: string[];
  template?: MyTemplate;
  callbackSave: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Message Template</Button>

      <Modal open={open} setOpen={setOpen}>
        <EditorWidget
          arrVarNames={arrVarNames}
          callbackSave={callbackSave}
          template={template}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
};
export default EditorWidgetModal;
