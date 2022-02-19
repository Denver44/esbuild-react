import React from 'react';
import { useAction } from '../../hook/use-actions';
import './style.css';

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useAction();
  return (
    <div className="addCell addCell-horizontal-line">
      <button
        className="button button-addCell is-primary is-small"
        onClick={() => insertCellBefore(nextCellId, 'code')}
      >
        <span className="icon">
          <i className="fas fa-plus" />
        </span>
        <p className="icon__text"> Code</p>
      </button>
      <button
        className="button button-addCell is-primary is-small"
        onClick={() => insertCellBefore(nextCellId, 'text')}
      >
        <span className="icon">
          <i className="fas fa-plus" />
        </span>
        <p className="icon__text"> Text</p>
      </button>
    </div>
  );
};

export default AddCell;
