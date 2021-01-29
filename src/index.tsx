import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import CodeEditor from "./components/code-editor";
import { unpkgPathPlugin, fetchPlugin } from "./plugins";
import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
  const [input, setInput] = useState<string>("");
  const serviceRef = useRef<any>(null);
  const iframeRef = useRef<any>(null);

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.33/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!serviceRef.current) {
      return;
    }

    iframeRef.current.srcdoc = html;

    const result = await serviceRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  const html = `
    <html lang="en">
        <head>
        <title>preview</title>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', (event) => {
                        try{
                            
                    eval(event.data);
                        } catch (err) {
                            const root = document.getElementById('root');
                            root.innerHTML = '<div style="color: red;"><h4>'+ err +'</h4></div>'
                            console.error(err);
                        }
                    }, false)
                </script>
            </body>
        </head>
    </html>
`;

  return (
    <div>
      <CodeEditor initialValue='const a = "seb"' onChange={setInput} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
