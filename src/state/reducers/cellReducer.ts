import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import produce from 'immer';

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

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.DELETE_CELL:
        state.order = state.order.filter((id) => id !== action.payload);
        delete state.data[action.payload];
        return state;

      case ActionType.INSERT_CELL_BEFORE:
        const cell = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        };
        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) return state;

        state.order.splice(foundIndex, 0, cell.id);
        return state;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex > state.order?.length - 1) return state;

        state.order[index] = state.order[newIndex];
        state.order[newIndex] = action.payload.id;
        return state;

      default:
        return state;
    }
  }
);
const randomId = () => {
  // bas 36 means letters and numbers
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
