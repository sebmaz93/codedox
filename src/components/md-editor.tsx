import MDEditor from "@uiw/react-md-editor";
import { FC, useState, useEffect, useRef } from "react";
import "./md-editor.scss";

const MdEditor: FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        event.target &&
        wrapperRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="markdown-editor" ref={wrapperRef}>
        <MDEditor value={value} onChange={setValue} />
      </div>
    );
  }
  return (
    <div className="markdown-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value || ""} />
      </div>
    </div>
  );
};

export default MdEditor;
