import './style.css';
import { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const textEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        textEditorRef.current &&
        event?.target &&
        textEditorRef.current.contains(event.target as Node) // Contains Except everything as Node due to not appropriate ts file we have to explicitly mentioned Node there.
      ) {
        console.log('Clicked Inside');
        return;
      }
      console.log('Clicked Outside');

      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={textEditorRef}>
        <MDEditor />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;
