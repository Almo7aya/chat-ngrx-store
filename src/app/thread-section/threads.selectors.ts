
import { values, last } from 'lodash';
import { ApplicationState } from '../store/application-state';
import { ThreadSummaryVM } from './threadSummary.vm';
import { Thread } from '../../../shared/model/thread';


export const userNameSelector = (state: ApplicationState): string => {
  const { userId: currentUserId } = state.uiState;
  const { participants } = state.dataState;
  if (!values(participants).length || !currentUserId) {
    return '';
  }

  const participant = state.dataState.participants[currentUserId];

  if (!participant) {
    return;
  }

  return participant.name;

};

export const unReadMessagesSelector = (state: ApplicationState): number => {
  const { userId: currentUserId } = state.uiState;
  if (!currentUserId) {
    return 0;
  }
  return values<Thread>(state.dataState.threads)
    .reduce((acc, threadIt: Thread) => acc + (threadIt.participants[currentUserId] || 0), 0);
};

export const threadSummarySelector = (state: ApplicationState): ThreadSummaryVM[] => {
  const thread = values<Thread>(state.dataState.threads);
  if (!thread.length) {
    return;
  }
  return thread.map((threadIt): ThreadSummaryVM => {
    const names = Object.keys(threadIt.participants)
      .map(participantId => state.dataState.participants[participantId].name);
    const lastMessageId = last<number>(threadIt.messageIds);
    const lastMessage = state.dataState.messages[lastMessageId];
    return {
      participantNames: names.join(', '),
      lastMessage: lastMessage.text,
      id: threadIt.id,
      timestamp: lastMessage.timestamp,
      read: threadIt.id === state.uiState.currentThreadId || threadIt.participants[state.uiState.userId] === 0
    };
  });
};

export const currentTheadIdSelector = (state: ApplicationState): number => state.uiState.currentThreadId;
