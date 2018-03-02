import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';

import { keyBy, clone, cloneDeep } from 'lodash';

import { UiState } from '../ui-state';
import { DataState } from '../data-state';
import { ApplicationState } from '../application-state';
import {
  USER_THREAD_LOADED_ACTION,
  UserThreadLoadedAction,
  SELECT_CURRENT_THREAD_ACTION,
  SelectCurrentThreadAction,
  NEW_MESSAGES_RECEIVED_ACTION,
  NewMessagesReceiveAction,
  ERROR_HAPPEN_ACTION
} from '../actions';
import { Participant } from '../../../../shared/model/participant';
import {
  SELECT_CURRENT_USER_ACTION,
  SelectCurrenUserAction,
  SEND_NEW_MESSAGE_ACTION,
  SendNewMessageAction,
  ErrorHappenAction
} from '../actions/index';
import { Message } from '../../../../shared/model/message';
import { routerReducer } from '@ngrx/router-store';


const uuid = require('uuid/V4');

const uiStateReducer: ActionReducer<UiState> =
  (state: UiState, action: Action): UiState => {

    switch (action.type) {

      case SELECT_CURRENT_THREAD_ACTION:
        const newUiStateThread = clone<UiState>(state);
        newUiStateThread.currentThreadId = (<SelectCurrentThreadAction>action).payload.currentThreadId;
        return newUiStateThread;

      case SELECT_CURRENT_USER_ACTION:
        const newUiStateUser = clone<UiState>(state);
        newUiStateUser.currentThreadId = undefined;
        newUiStateUser.userId = ((<SelectCurrenUserAction>action).payload);
        return newUiStateUser;

      case ERROR_HAPPEN_ACTION:
        const nUiState = cloneDeep(state);
        const { payload: errorMessage } = (<ErrorHappenAction>action);
        nUiState.currentError = errorMessage;

        return nUiState;

      default:
        return state;
    }

  };

const dataStateReducer: ActionReducer<DataState> =
  (state: DataState, action: Action): DataState => {
    switch (action.type) {

      case SELECT_CURRENT_THREAD_ACTION:
        const cnDataState = cloneDeep(state);
        const { currentThreadId, currentUserId } = (<SelectCurrentThreadAction>action).payload;

        cnDataState.threads[currentThreadId].participants[currentUserId] = 0;

        return cnDataState;

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
          id: uuid(),
          text: newMessage.text,
          threadId: newMessage.threadId,
          timestamp: Date.now(),
          participantId: newMessage.participantId,
        };

        currentThread.messageIds.push(message.id);
        newDataState.messages[message.id] = message;
        return newDataState;

      case NEW_MESSAGES_RECEIVED_ACTION:

        const { newMessages, uiState } = (<NewMessagesReceiveAction>action).payload;
        if (!newMessages.length) {
          // if there's no new messages
          return state;
        }

        const nDataState = cloneDeep(state);

        newMessages.forEach(nMessage => {

          nDataState.messages[nMessage.id] = nMessage;
          nDataState.threads[nMessage.threadId].messageIds.push(nMessage.id);

          if (nMessage.threadId !== uiState.currentThreadId) {
            nDataState.threads[nMessage.threadId].participants[uiState.userId] += 1;
          }

        });

        return nDataState;

      default:
        return state;
    }
  };


export const mapReducers: ActionReducerMap<ApplicationState> = {
  uiState: uiStateReducer,
  dataState: dataStateReducer,
  routerState: routerReducer
};
