import { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const handleSubmit = () => {
    console.log(input);
  };
  return (
    <div>
      <textarea onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
