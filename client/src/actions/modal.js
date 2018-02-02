import { ActionKeys } from '../constants/action_keys';

/**
 *  Show Modal
 *    @param payload = { @param type }
 *  Defined which modal to show.
 *    @param typee = 'createJob' | 'updateJob'
*/
export function showModal(payload) {
  return {
    type: ActionKeys.SHOW_MODAL,
    payload,
  };
}


/**
 *  Hide Modal
 *    @param payload = { @param status }
 *  if modal executed successfully, status is 'success'.
 *    @param status = 'success' | 'failed'
 *    @default satus = 'failed'
*/
export function hideModal(payload = { status: 'failed' }) {
  return {
    type: ActionKeys.HIDE_MODAL,
    payload,
  };
}
