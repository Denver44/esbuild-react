import { useState } from 'react';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import bundle from '../../bundle';
import Resizable from '../Resizable';
import './style.css';

const CodeCell = () => {
  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    const result = await bundle(input);
    setCode(result);
  };

  return (
    <Resizable direction="vertical">
      <div className="codeCell">
        <CodeEditor
          initialValue="const a = 1;"
          onChange={(value) => setInput(value)}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
