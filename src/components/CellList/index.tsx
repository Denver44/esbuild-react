import { useTypedSelector } from '../../hook/used-typed-selector';

const CellList = () => {
  useTypedSelector((state) => state);

  return <div>CellList</div>;
};

export default CellList;
