import * as esBuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';

const App = () => {
  const ref = useRef<any>();
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const handleSubmit = async () => {
    if (!ref.current) return;
    // transform function actually does the transpiling for us.
    const res = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    console.log(res);
    setCode(res.code);
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
