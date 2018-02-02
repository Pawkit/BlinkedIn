import { ActionKeys } from '../constants/action_keys';

/** Clear auth state */
export function clearAuthState() {
  return {
    type: ActionKeys.CLEAR_AUTH_STATE,
  };
}


/** Update auth state */
export function updateAuthState(payload) {
  return {
    type: ActionKeys.UPDATE_AUTH_STATE,
    payload,
  };
}
