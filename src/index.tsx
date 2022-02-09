import * as esBuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

const startService = async () => {
  const service = await esBuild.startService({
    worker: true,
    wasmURL: '/esbuild.wasm',
  });
  console.log(service);
};

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const handleSubmit = () => {
    console.log(input);
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <textarea onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
