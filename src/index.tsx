import * as esBuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';
import { fetchPlugin } from './plugins/fetch-plugins';

const startService = async (ref: React.MutableRefObject<any>) => {
  ref.current = await esBuild.startService({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
  });
};

const App = () => {
  const ref = useRef<any>();
  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState('');

  useEffect(() => {
    startService(ref);
  }, []);

  const handleSubmit = async () => {
    if (!ref.current) return;
    // transform function actually does the transpiling for us.
    const res = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // console.log(res);
    setCode(res.outputFiles[0].text);

    // using eval is not a good approach and through we put the eval function in try catch block but still on async code it will throw error if any error occurred at that time
    try {
      eval(res.outputFiles[0].text);
    } catch (error) {
      alert(error);
    }
  };

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
