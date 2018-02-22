import { ActionReducer, ActionReducerMap, Action } from "@ngrx/store";

import { keyBy } from 'lodash';

import { UiState } from "../ui-state";
import { DataState } from "../data-state";
import { ApplicationState } from "../application-state";
import { LOAD_USER_THREAD_ACTION, LoadUserThreadAction } from "../actions";
import { Participant } from "../../../../shared/model/participant";

const uiStateReducer: ActionReducer<UiState> =
  (state: UiState, action: Action): UiState => {

    return state;
  };

const dataStateReducer: ActionReducer<DataState> =
  (state: DataState, action: Action): DataState => {
    switch (action.type) {
      case LOAD_USER_THREAD_ACTION:
        const userData = (<LoadUserThreadAction>action).payload;
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
