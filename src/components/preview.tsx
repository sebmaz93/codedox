import { useRef, useEffect, FC } from "react";
import "./preview.scss";

interface OwnProps {
  code: string;
}

const Preview: FC<OwnProps> = ({ code }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 75);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

const html = `
    <html lang="en">
        <head>
        <title>preview</title>
        <style>
        html {background-color: white}
</style>
        </head>
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
    </html>
`;

export default Preview;
