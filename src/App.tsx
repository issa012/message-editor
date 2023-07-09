import EditorWidgetModal from './components/EditorWidgetModal';

function App() {
  let arrVarNames = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ['firstname', 'lastname', 'company', 'position'];
  let template = localStorage.template ? JSON.parse(localStorage.template) : null;

  return (
    <>
      <EditorWidgetModal
        arrVarNames={arrVarNames}
        template={template}
        callbackSave={async () => {}}
      />
    </>
  );
}

export default App;
