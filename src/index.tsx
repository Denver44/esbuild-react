import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import bundle from './bundle';

const App = () => {
  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    const result = await bundle(input);
    setCode(result);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
