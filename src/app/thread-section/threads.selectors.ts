
import { values, last } from "lodash";
import { ApplicationState } from "../store/application-state";
import { ThreadSummaryVM } from "./threadSummary.vm";
import { Thread } from "../../../shared/model/thread";


export const userNameSelector = (state: ApplicationState): string => {
  const { userId: currentUserId } = state.uiState;
  const { participants } = state.dataState;
  if (!values(participants).length) {
    return '';
  }
  return state.dataState.participants[currentUserId].name;
}

export const unReadMessagesSelector = (state: ApplicationState): number => {
  const { userId: currentUserId } = state.uiState;
  if (!currentUserId) {
    return 0;
  }
  return values<Thread>(state.dataState.threads)
    .reduce((acc, thread: Thread) => acc + (thread.participants[currentUserId] || 0), 0);
}

export const threadSummarySelector = (state: ApplicationState): ThreadSummaryVM[] => {
  const thread = values<Thread>(state.dataState.threads);
  if (!thread.length) {
    return;
  }
  return thread.map((thread): ThreadSummaryVM => {
    const names = Object.keys(thread.participants)
      .map(participantId => state.dataState.participants[participantId].name);
    const lastMessageId = last<number>(thread.messageIds);
    const lastMessage = state.dataState.messages[lastMessageId];
    return {
      participantNames: names.join(', '),
      lastMessage: lastMessage.text,
      id: thread.id,
      timestamp: lastMessage.timestamp
    }
  });
}
