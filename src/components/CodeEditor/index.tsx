import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import './style.css';
interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const EditorRef = useRef<any>(); // We are setting the reference of monacoEditor

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    EditorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => onChange(getValue()));
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // Getting the unformatted value
    const unformatted = EditorRef.current.getModel().getValue();

    // Format the Value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // Set the format value to the editor
    EditorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue} // InitialValue
        theme="dark"
        language="cpp"
        height="500px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          mouseWheelZoom: true,
          formatOnType: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
