import { useState } from 'react';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import bundle from '../../bundle';

const CodeCell = () => {
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

export default CodeCell;
