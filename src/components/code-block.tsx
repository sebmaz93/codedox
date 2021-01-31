import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import bundler from "../bundler";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeBlock = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="v">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="h">
          <CodeEditor initialValue='const a = "seb"' onChange={setInput} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeBlock;
