import { ActionKeys } from '../constants/action_keys';

const initialState = {
  type: '',
  status: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ActionKeys.HIDE_MODAL:
    return {
      initialState,
      ...action.payload,
    };
  case ActionKeys.SHOW_MODAL:
    return {
      ...action.payload,
    };
  default:
    return state;
  }
}
