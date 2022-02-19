import './style.css';
import { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../state';
import { useAction } from '../../hook/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const textEditorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useAction();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        textEditorRef.current &&
        event?.target &&
        textEditorRef.current.contains(event.target as Node) // Contains Except everything as Node due to not appropriate ts file we have to explicitly mentioned Node there.
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={textEditorRef} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(rawCode) => updateCell(cell.id, rawCode || '')}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} className="text-editor">
      <div className="card-content">
        <MDEditor.Markdown source={cell.content} />
      </div>
    </div>
  );
};

export default TextEditor;
