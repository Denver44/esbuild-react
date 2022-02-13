import * as esBuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';
import { fetchPlugin } from './plugins/fetch-plugins';
import CodeEditor from './components/CodeEditor';

const startService = async (ref: React.MutableRefObject<any>) => {
  ref.current = await esBuild.startService({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
  });
};

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <div id="root"></div>
    <script>
    window.addEventListener("message", (event) => {
      try {
        eval(event.data);
      } catch (error) {
        const root = document.querySelector('#root');
        const errorMsg = '<div style="color: red;"><h4>Runtime Error : </h4>' + error + '</div>';
        root.innerHTML = errorMsg;
        console.error(error);
      }
    }, false);
    </script>
  </body>
</html>
`;

const App = () => {
  const ref = useRef<any>();
  const iFrame = useRef<any>();

  const [code] = useState<string>('');
  const [input, setInput] = useState('');

  useEffect(() => {
    startService(ref);
  }, []);

  const handleSubmit = async () => {
    if (!ref.current) return;

    iFrame.current.srcdoc = html;
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
    iFrame.current.contentWindow.postMessage(res.outputFiles[0].text, '*');
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <textarea onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe
        ref={iFrame}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
