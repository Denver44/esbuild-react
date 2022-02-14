import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <div id="root"></div>
    <script>
    window.addEventListener("message", (event) => {
      try {
        eval(event.data);
      } catch (error) {
        const root = document.querySelector('#root');
        const errorMsg = '<div style="color: red;"><h4>Runtime Error : </h4>' + error + '</div>';
        root.innerHTML = errorMsg;
        console.error(error);
      }
    }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iFrame = useRef<any>();

  useEffect(() => {
    iFrame.current.srcdoc = html;
    iFrame.current.contentWindow.postMessage(code, '*');
  });

  return (
    <iframe
      ref={iFrame}
      title="preview"
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default Preview;
