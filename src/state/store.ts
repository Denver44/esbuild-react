import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';

const composeEnhancers = composeWithDevTools({});
export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

const dispatchMyPayload = (obj: any) => {
  store.dispatch({ ...obj });
};

const payloadOne = {
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code',
  },
};
const payloadTwo = {
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: store.getState().cells?.order[0],
    type: 'text',
  },
};
dispatchMyPayload(payloadOne);
dispatchMyPayload(payloadTwo);
