import { ActionKeys } from '../constants/action_keys';

const initialState = {
  isAuthorised: false,
  uid: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ActionKeys.CLEAR_AUTH_STATE:
    return initialState;
  case ActionKeys.UPDATE_AUTH_STATE:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}
