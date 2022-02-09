import * as esBuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';

const App = () => {
  const ref = useRef<any>();
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const handleSubmit = () => {
    if (!ref.current) return;
    console.log(ref);
  };
  const startService = async () => {
    ref.current = await esBuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
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
