import { ApplicationState } from '../store/application-state';
import { values, keys, partial } from 'lodash';

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

    const messages = getMessagesFromThread(state);

    const participants = getParticipants(state);

    return mapMessagesToMessagesVM(participants, messages);

  };


function getMessagesFromThread(state: ApplicationState): Message[] {
  const currentTheard = state.dataState.threads[state.uiState.currentThreadId];
  if (!currentTheard) {
    return;
  }
  return currentTheard.messageIds.map((messageId) => state.dataState.messages[messageId]);
}

function getParticipants(state: ApplicationState) {
  return state.dataState.participants;
}

function mapMessageToMessageVM(participant: { [key: number]: Participant }, message: Message): MessageVM {
  return {
    id: message.id,
    timestamp: message.timestamp,
    participantName: participant[message.participantId].name,
    text: message.text
  };
}

function mapMessagesToMessagesVM(participants: { [key: number]: Participant }, messages: Message[]) {
  return messages.map(message => mapMessageToMessageVM(participants, message));
}
