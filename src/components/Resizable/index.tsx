import { ResizableBox } from 'react-resizable';
import './style.css';
interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
