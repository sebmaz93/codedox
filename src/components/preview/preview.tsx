import {useRef, useEffect, FC} from 'react'
import './preview.scss'

interface OwnProps {
  code: string
  bundlerErr: string
}

const Preview: FC<OwnProps> = ({code, bundlerErr}) => {
  const iframeRef = useRef<any>(null)

  useEffect(() => {
    iframeRef.current.srcdoc = html
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    }, 75)
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {bundlerErr && <div className="preview-error">{bundlerErr}</div>}
    </div>
  )
}

const html = `
<html lang="en">
  <head>
    <title>preview</title>
    <style>
      html {
        background-color: white;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.getElementById("root");
        root.innerHTML = '<div style="color: red;"><h4>' + err + "</h4></div>";
        console.error(err);
      };
      window.addEventListener("error", (event) => {
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener(
        "message",
        (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        },
        false
      );
    </script>
  </body>
</html>
`

export default Preview
