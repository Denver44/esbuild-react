import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esBuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';
import { fetchPlugin } from './plugins/fetch-plugins';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';

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
    setCode(res.outputFiles[0].text);
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
