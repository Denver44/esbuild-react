import { useEffect } from 'react';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import Resizable from '../Resizable';
import './style.css';
import { Cell } from '../../state';
import { useAction } from '../../hook/use-actions';
import { useTypedSelector } from '../../hook/use-typed-selector';

interface OutputProps {
  code: string;
  err: string;
}

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useAction();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  useEffect(() => {
    const timerId = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timerId);
    };
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="codeCell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {/* <Preview code={code} buildFailMsg={err} /> */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
