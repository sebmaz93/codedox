import MonacoEditor, { OnMount, OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useState, useRef, FC } from "react";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import "./code-editor.scss";
import "./syntax.scss";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const [language, setLanguage] = useState<"javascript" | "typescript">(
    "javascript"
  );
  const editorRef = useRef<any>();

  const handleOnMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // TODO : find better highlighting options
    /*https://robkendal.co.uk/blog/2020-02-20-creating-a-react-code-editor-and-syntax-highlighter*/
    const highlighter = new Highlighter(monaco, codeShift, editor);
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const handleOnChange: OnChange = (value = "") => {
    onChange(value);
  };

  const handleOnFormat = () => {
    const uglyCode = editorRef.current.getModel().getValue();
    const prettyCode = prettier
      .format(uglyCode, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(prettyCode);
  };

  const handleLanguageChange = () => {
    setLanguage(language === "javascript" ? "typescript" : "javascript");
  };

  // TODO : ADD LANGUAGES SUPPORT
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleOnFormat}
      >
        Format
      </button>
      {/*<button*/}
      {/*  className="button button-language is-small"*/}
      {/*  onClick={handleLanguageChange}*/}
      {/*>*/}
      {/*  Change to : {language === "javascript" ? "typescript" : "javascript"}*/}
      {/*</button>*/}
      <MonacoEditor
        onMount={handleOnMount}
        onChange={handleOnChange}
        defaultValue={initialValue}
        theme="vs-dark"
        language={language}
        height="100%"
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
