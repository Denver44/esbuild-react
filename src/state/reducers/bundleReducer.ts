import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundleState = {};

const reducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        break;
      case ActionType.BUNDLE_COMPLETE:
        break;
      default:
        break;
    }
  }
);

export default reducer;
