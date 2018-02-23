import { ActionReducer, ActionReducerMap, Action } from "@ngrx/store";

import { keyBy, clone } from 'lodash';

import { UiState } from "../ui-state";
import { DataState } from "../data-state";
import { ApplicationState } from "../application-state";
import { USER_THREAD_LOADED_ACTION, UserThreadLoadedAction, SELECT_CURRENT_THREAD_ACTION, SelectCurrentThreadAction } from "../actions";
import { Participant } from "../../../../shared/model/participant";

const uiStateReducer: ActionReducer<UiState> =
  (state: UiState, action: Action): UiState => {

    switch (action.type) {

      case SELECT_CURRENT_THREAD_ACTION:
        const newUiState = clone<UiState>(state);
        newUiState.currentThreadId = (<SelectCurrentThreadAction>action).payload;
        return newUiState;
      default:
        return state;
    }

  };

const dataStateReducer: ActionReducer<DataState> =
  (state: DataState, action: Action): DataState => {
    switch (action.type) {
      case USER_THREAD_LOADED_ACTION:
        const userData = (<UserThreadLoadedAction>action).payload;
        const newUserDate: DataState = {
          participants: keyBy(userData.participants, 'id'),
          messages: keyBy(userData.messages, 'id'),
          threads: keyBy(userData.threads, 'id')
        }
        return newUserDate;

      default:
        return state;
    }
  };


export const mapReducers: ActionReducerMap<ApplicationState> = {
  uiState: uiStateReducer,
  dataState: dataStateReducer
}
