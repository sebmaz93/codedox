import { useRef, useEffect, FC } from "react";

interface OwnProps {
  code: string;
}

const Preview: FC<OwnProps> = ({ code }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      srcDoc={html}
      sandbox="allow-scripts"
    />
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

export default Preview;
