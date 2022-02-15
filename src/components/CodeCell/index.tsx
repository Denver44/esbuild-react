import { useEffect, useState } from 'react';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import bundle from '../../bundle';
import Resizable from '../Resizable';
import './style.css';

interface OutputProps {
  code: string;
  err: string;
}

const CodeCell = () => {
  const [code, setCode] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const result: OutputProps = await bundle(input);
      setCode(result.code);
      setErr(result.err);
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
        <Preview code={code} buildFailMsg={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
