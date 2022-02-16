import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import produce from 'immer';
import { stat } from 'fs';
import { act } from 'react-dom/test-utils';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return;

    case ActionType.DELETE_CELL:
      state.order = state.order.filter((id) => id !== action.payload);
      delete state.data[action.payload];
      return;

    case ActionType.INSERT_CELL_BEFORE:
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex > state.order?.length - 1) return;

      state.order[index] = state.order[newIndex];
      state.order[newIndex] = action.payload.id;
      return;

    default:
      return state;
  }
});

export default reducer;
