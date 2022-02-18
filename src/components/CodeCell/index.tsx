import { useEffect, useState } from 'react';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import bundle from '../../bundle';
import Resizable from '../Resizable';
import './style.css';
import { Cell } from '../../state';
import { useAction } from '../../hook/use-actions';

interface OutputProps {
  code: string;
  err: string;
}

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const { updateCell } = useAction();
  useEffect(() => {
    const timerId = setTimeout(async () => {
      const result: OutputProps = await bundle(cell.content);
      setCode(result.code);
      setErr(result.err);
    }, 750);

    return () => {
      clearTimeout(timerId);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="codeCell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} buildFailMsg={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
