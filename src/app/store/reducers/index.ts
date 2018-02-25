import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';

import { keyBy, clone, cloneDeep } from 'lodash';

import { UiState } from '../ui-state';
import { DataState } from '../data-state';
import { ApplicationState } from '../application-state';
import { USER_THREAD_LOADED_ACTION, UserThreadLoadedAction, SELECT_CURRENT_THREAD_ACTION, SelectCurrentThreadAction } from '../actions';
import { Participant } from '../../../../shared/model/participant';
import { SELECT_CURRENT_USER_ACTION, SelectCurrenUserAction, SEND_NEW_MESSAGE_ACTION, SendNewMessageAction } from '../actions/index';
import { Message } from '../../../../shared/model/message';

const uiStateReducer: ActionReducer<UiState> =
  (state: UiState, action: Action): UiState => {

    switch (action.type) {

      case SELECT_CURRENT_THREAD_ACTION:
        const newUiStateThread = clone<UiState>(state);
        newUiStateThread.currentThreadId = (<SelectCurrentThreadAction>action).payload;
        return newUiStateThread;

      case SELECT_CURRENT_USER_ACTION:
        const newUiStateUser = clone<UiState>(state);
        newUiStateUser.currentThreadId = undefined;
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

      case SEND_NEW_MESSAGE_ACTION:
        const { payload: newMessage } = (<SendNewMessageAction>action);
        const newDataState = cloneDeep<DataState>(state),
          currentThread = newDataState.threads[newMessage.threadId];

        const message: Message = {
          id: +Date.now().toString().slice(4),
          text: newMessage.text,
          threadId: newMessage.threadId,
          timestamp: Date.now(),
          participantId: newMessage.participantId,
        };

        currentThread.messageIds.push(message.id);
        newDataState.messages[message.id] = message;
        return newDataState;

      default:
        return state;
    }
  };


export const mapReducers: ActionReducerMap<ApplicationState> = {
  uiState: uiStateReducer,
  dataState: dataStateReducer
};
