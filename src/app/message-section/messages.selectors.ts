import { ApplicationState } from '../store/application-state';
import { values, keys, partial, memoize } from 'lodash';

import { MessageVM } from './message.vm';
import { Participant } from '../../../shared/model/participant';
import { Message } from '../../../shared/model/message';
import { createSelector } from 'reselect';


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


export const messageSelector = createSelector(getParticipants, getMessagesFromThread, mapMessagesToMessagesVM);


function getMessagesFromThread(state: ApplicationState): Message[] {
  const currentTheard = state.dataState.threads[state.uiState.currentThreadId];
  if (!currentTheard) {
    return null;
  }
  return currentTheard.messageIds.map((messageId) => state.dataState.messages[messageId]);
}

function getParticipants(state: ApplicationState) {
  return state.dataState.participants;
}


function mapMessagesToMessagesVM(participants: { [key: number]: Participant }, messages: Message[]) {
  if (!messages) { return; }
  return messages.map(message => {

    const participantName = participants[message.participantId].name;

    return mapMessageToMessageVM(participantName, message);
  });
}

const mapMessageToMessageVM = memoize((participantName: string, message: Message): MessageVM => {
  return {
    id: message.id,
    timestamp: message.timestamp,
    participantName: participantName,
    text: message.text
  };
},
  (participantName: string, message: Message) => message.id + participantName
);
