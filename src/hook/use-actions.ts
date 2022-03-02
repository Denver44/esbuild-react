import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useAction = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};

/* Now we have to write like this two dispatch the actions
const { updateCell } = useAction();
updateCell("Const a = 10;")
*/
