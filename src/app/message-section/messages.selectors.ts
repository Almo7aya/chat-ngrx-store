import { ApplicationState } from '../store/application-state';
import { values, keys } from 'lodash';

import { MessageVM } from './message.vm';
import { Participant } from '../../../shared/model/participant';
import { Message } from '../../../shared/model/message';


export const participantNamesSelector =
  (state: ApplicationState): string => {

    const { currentThreadId } = state.uiState;

    if (!currentThreadId) {
      return '';
    }

    const currentTheard = state.dataState.threads[currentThreadId];

    if (!currentTheard) {
      return;
    }

    return keys(currentTheard.participants)
      .map((participantId): string => {
        return state.dataState.participants[participantId].name;
      }).join(', ');

  };


export const messageSelector =
  (state: ApplicationState): MessageVM[] => {

    const { currentThreadId } = state.uiState;

    if (!currentThreadId) {
      return;
    }

    const currentTheard = state.dataState.threads[currentThreadId];

    if (!currentTheard) {
      return;
    }

    const messages = currentTheard.messageIds.map((messageId) => state.dataState.messages[messageId]);

    return messages.map(messageToMessageVM.bind(null, state)); // carring
    // return messages.map(messageToMessageVM.bind(null, state)); // carring

  };


function messageToMessageVM(state: ApplicationState, message: Message): MessageVM {
  return {
    id: message.id,
    timestamp: message.timestamp,
    participantName: state.dataState.participants[message.participantId].name,
    text: message.text
  };
}
