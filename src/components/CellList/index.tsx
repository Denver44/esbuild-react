import { useTypedSelector } from '../../hook/use-typed-selector';
import CellListItem from '../CellListItem';
import ActionBar from '../ActionBar';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id) => cells.data[id])
  );

  const renderedCells = cells?.map((cell) => {
    return (
      <div>
        <ActionBar id={cell.id} />
        <CellListItem key={cell.id} cell={cell} />;
      </div>
    );
  });

  return <div>{renderedCells}</div>;
};

export default CellList;
