import ActionButton from '../ActionButton';
import './style.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  return (
    <div className="action-button">
      <ActionButton id={id} iconName={'fa-arrow-up'} actionName={'up'} />
      <ActionButton id={id} iconName={'fa-arrow-down'} actionName={'down'} />
      <ActionButton id={id} iconName={'fa-times'} actionName={'delete'} />
    </div>
  );
};

export default ActionBar;
