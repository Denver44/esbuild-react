import { useEffect, useState } from 'react';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import bundle from '../../bundle';
import Resizable from '../Resizable';
import './style.css';

const CodeCell = () => {
  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const result = await bundle(input);
      setCode(result);
    }, 750);

    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="codeCell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
