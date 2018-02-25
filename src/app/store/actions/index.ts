import { Action } from '@ngrx/store';

import { AllUserData } from '../../../../shared/to/all-user-data';


export const LOAD_USER_DATA_ACTION = 'LOAD_USER_DATA_ACTION';
export class LoadUserDataAction implements Action {
  readonly type = LOAD_USER_DATA_ACTION;
  constructor(public payload: number) { }
}


export const USER_THREAD_LOADED_ACTION = 'USER_THREAD_LOADED_ACTION';
export class UserThreadLoadedAction implements Action {
  readonly type = USER_THREAD_LOADED_ACTION;
  constructor(public payload: AllUserData) { }
}


export const SELECT_CURRENT_THREAD_ACTION = 'SELECT_CURRENT_THREAD_ACTION';
export class SelectCurrentThreadAction implements Action {
  readonly type = SELECT_CURRENT_THREAD_ACTION;
  constructor(public payload: number) { }
}


export const SELECT_CURRENT_USER_ACTION = 'SELECT_CURRENT_USER_ACTION';
export class SelectCurrenUserAction implements Action {
  readonly type = SELECT_CURRENT_USER_ACTION;
  constructor(public payload: number) { }
}


export interface MessageToBeSend {
  text: string;
  threadId: number;
  participantId: number;
}
export const SEND_NEW_MESSAGE_ACTION = 'SEND_NEW_MESSAGE_ACTION';
export class SendNewMessageAction implements Action {
  readonly type = SEND_NEW_MESSAGE_ACTION;
  constructor(public payload: MessageToBeSend) { }
}
