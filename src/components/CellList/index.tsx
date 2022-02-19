import { useTypedSelector } from '../../hook/use-typed-selector';
import CellListItem from '../CellListItem';
import AddCell from '../AddCell';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id) => cells.data[id])
  );

  const renderedCells = cells?.map((cell) => (
    <>
      <AddCell nextCellId={cell.id} />
      <CellListItem key={cell.id} cell={cell} />
    </>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  );
};

export default CellList;
