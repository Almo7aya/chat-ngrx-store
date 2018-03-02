import { RouterReducerState } from '@ngrx/router-store';

import { DataState, INITIAL_DATA_STATE } from './data-state';
import { UiState, INITIAL_UI_STATE } from './ui-state';
import { Route, Params, RouterStateSnapshot } from '@angular/router';
import { dbMessagesQueuePerUser } from '../../server/model/data-db';
import { RouterState } from './router-state';

export interface ApplicationState {
  dataState: DataState;
  uiState: UiState;
  routerState: RouterReducerState<RouterState>;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  dataState: INITIAL_DATA_STATE,
  uiState: INITIAL_UI_STATE,
  routerState: {
    state: undefined,
    navigationId: undefined
  }
};
