import { ApplicationState } from "../store/application-state";
import { ThreadSummaryVM } from "./threadSummary.vm";
import { Thread } from "../../../shared/model/thread";
import { values } from "lodash";

export const mapStateToUserName = (state: ApplicationState): string => {
  const { userId: currentUserId } = state.uiState;
  return state.dataState.participants[currentUserId].name;
}

export const mapStateToUnReadMessages = (state: ApplicationState): number => {
  const { userId: currentUserId } = state.uiState;
  return values<Thread>(state.dataState.threads)
    .reduce((acc, thread: Thread) => acc + thread.participants[currentUserId], 0);
}


export const mapStateToThreadSummary = (state: ApplicationState): ThreadSummaryVM[] => {

  const thread = values<Thread>(state.dataState.threads);

  return thread.map((thread): ThreadSummaryVM => {
    return {
      participantNames: null,
      lastMessage: null,
      id: thread.id
    }
  });

}
