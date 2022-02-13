import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  input: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ input }) => {
  return (
    <MonacoEditor
      value={input} // InitialValue
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
  );
};

export default CodeEditor;
