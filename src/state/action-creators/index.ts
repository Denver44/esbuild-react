import { ActionType } from '../action-types';
import {
  Action,
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
} from '../actions';

export const updateCell = (): UpdateCellAction => {};
export const moveCell = (): MoveCellAction => {};
export const deleteCell = (): DeleteCellAction => {};
export const insertCellBefore = (): InsertCellBeforeAction => {};
