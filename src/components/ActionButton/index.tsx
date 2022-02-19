import { useAction } from '../../hook/use-actions';

interface ActionButtonProps {
  id: string;
  iconName: string;
  actionName: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  id,
  iconName,
  actionName,
}) => {
  const { moveCell, deleteCell } = useAction();

  const onClickHandler = () => {
    actionName === 'up' || actionName === 'down'
      ? moveCell(id, actionName)
      : deleteCell(id);
  };

  return (
    <button className="button is-primary is-small" onClick={onClickHandler}>
      <span className="icon">
        <i className={`fas ${iconName}`} />
      </span>
    </button>
  );
};

export default ActionButton;
