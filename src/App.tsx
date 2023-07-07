import EditorWidget from './components/EditorWidget/EditorWidget';
import './App.css';

function App() {
  return (
    <div>
      <EditorWidget
        callbackSave={async () => {}}
        arrVarNames={['Yeldar', 'Issa', 'Some company', 'Junior']}
      />
    </div>
  );
}

export default App;
