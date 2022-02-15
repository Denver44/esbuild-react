import { useEffect, useRef } from 'react';
import './style.css';

interface PreviewProps {
  code: string;
  buildFailMsg: string;
}

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
  <style> html{background-color : white;} </style>
  </head>
  <body>
    <div id="root"></div>

    <script>

    const handleError = (error)=>{
      const root = document.querySelector('#root');
      const errorMsg = '<div style="color: red;"><h4>Runtime Error : </h4>' + error + '</div>';
      root.innerHTML = errorMsg;
    }
    window.addEventListener('error' , (event) => {
      event.preventDefault();
      handleError(event.error);
    })

    window.addEventListener("message", (event) => {
      try {
        eval(event.data);
      } catch (error) {
        handleError(error);
      }
    }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, buildFailMsg }) => {
  const iFrame = useRef<any>();

  useEffect(() => {
    iFrame.current.srcdoc = html;

    // Here we are giving enough time to our browser to update current.srcdoc with html and then put the postMessage Event Listener

    setTimeout(() => {
      iFrame.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        className="preview-iframe"
        ref={iFrame}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {buildFailMsg && <div className="preview-error">{buildFailMsg}</div>}
    </div>
  );
};

export default Preview;
