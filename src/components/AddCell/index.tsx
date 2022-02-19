import React from 'react';
import { useAction } from '../../hook/use-actions';

interface AddCellProps {
  nextCellId: string;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useAction();
  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, 'code')}>
        + Code
      </button>
      <button onClick={() => insertCellBefore(nextCellId, 'text')}>
        + Text
      </button>
    </div>
  );
};

export default AddCell;
