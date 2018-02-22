import { Action } from "@ngrx/store";

import { AllUserData } from "../../../../shared/to/all-user-data";

export const LOAD_USER_THREAD_ACTION = 'LOAD_USER_THREAD_ACTION';
export class LoadUserThreadAction implements Action {

  readonly type = LOAD_USER_THREAD_ACTION;

  constructor(public payload: AllUserData) { }

}

