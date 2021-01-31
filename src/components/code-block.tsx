import { useState } from "react";
import CodeEditor from "./code-editor";
import bundler from "../bundler";
import Preview from "./preview";

const CodeBlock = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue='const a = "seb"' onChange={setInput} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeBlock;
