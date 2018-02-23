import { Action } from "@ngrx/store";

import { AllUserData } from "../../../../shared/to/all-user-data";

export const LOAD_USER_DATA_ACTION = 'LOAD_USER_DATA_ACTION';
export class LoadUserDataAction implements Action {
  readonly type = LOAD_USER_DATA_ACTION;
}


export const USER_THREAD_LOADED_ACTION = 'USER_THREAD_LOADED_ACTION';
export class UserThreadLoadedAction implements Action {
  readonly type = USER_THREAD_LOADED_ACTION;
  constructor(public payload: AllUserData) { }
}