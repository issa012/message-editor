import EditorWidget from './components/EditorWidget/EditorWidget';
import './App.css';

function App() {
  let arrVarNames = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ['firstname', 'lastname', 'company', 'position'];
  let template = localStorage.template ? JSON.parse(localStorage.template) : null;

  return (
    <div>
      <EditorWidget arrVarNames={arrVarNames} template={template} callbackSave={async () => {}} />
    </div>
  );
}

export default App;
