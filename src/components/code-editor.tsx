import MonacoEditor, { OnMount, OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef, FC } from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const handleOnMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleOnChange: OnChange = (value = "") => {
    onChange(value);
  };

  const handleOnFormat = () => {
    const uglyCode = editorRef.current.getModel().getValue();
    const prettyCode = prettier.format(uglyCode, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    editorRef.current.setValue(prettyCode);
  };

  return (
    <div>
      <button onClick={handleOnFormat}>Format</button>
      <MonacoEditor
        onMount={handleOnMount}
        onChange={handleOnChange}
        defaultValue={initialValue}
        theme="vs-dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          fontSize: 16,
          folding: false,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
