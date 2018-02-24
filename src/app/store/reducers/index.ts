import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';

import { keyBy, clone } from 'lodash';

import { UiState } from '../ui-state';
import { DataState } from '../data-state';
import { ApplicationState } from '../application-state';
import { USER_THREAD_LOADED_ACTION, UserThreadLoadedAction, SELECT_CURRENT_THREAD_ACTION, SelectCurrentThreadAction } from '../actions';
import { Participant } from '../../../../shared/model/participant';
import { SELECT_CURRENT_USER_ACTION, SelectCurrenUserAction } from '../actions/index';

const uiStateReducer: ActionReducer<UiState> =
  (state: UiState, action: Action): UiState => {

    switch (action.type) {

      case SELECT_CURRENT_THREAD_ACTION:
        const newUiStateThread = clone<UiState>(state);
        newUiStateThread.currentThreadId = (<SelectCurrentThreadAction>action).payload;
        return newUiStateThread;

      case SELECT_CURRENT_USER_ACTION:
        const newUiStateUser = clone<UiState>(state);
        newUiStateUser.userId = ((<SelectCurrenUserAction>action).payload);
        return newUiStateUser;

      default:
        return state;
    }

  };

const dataStateReducer: ActionReducer<DataState> =
  (state: DataState, action: Action): DataState => {
    switch (action.type) {

      case USER_THREAD_LOADED_ACTION:
        const { payload: userData } = (<UserThreadLoadedAction>action);
        const newUserDate: DataState = {
          participants: keyBy(userData.participants, 'id'),
          messages: keyBy(userData.messages, 'id'),
          threads: keyBy(userData.threads, 'id')
        };
        return newUserDate;

      default:
        return state;
    }
  };


export const mapReducers: ActionReducerMap<ApplicationState> = {
  uiState: uiStateReducer,
  dataState: dataStateReducer
};
