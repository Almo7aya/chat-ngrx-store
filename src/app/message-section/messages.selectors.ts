import { ApplicationState } from "../store/application-state";
import { values, keys } from "lodash";

import { MessageVM } from "./message.vm";
import { Participant } from "../../../shared/model/participant";
import { Message } from "../../../shared/model/message";


export const participantNamesSelector =
  (state: ApplicationState): string => {

    const { currentThreadId } = state.uiState;

    if (!currentThreadId) {
      return '';
    }

    const currentTheard = state.dataState.threads[currentThreadId];

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

    return currentTheard.messageIds.map((messageId): MessageVM => {

      const message: Message = state.dataState.messages[messageId];

      return {
        id: message.id,
        timestamp: message.timestamp,
        text: message.text,
        participantName: state.dataState.participants[message.participantId].name
      };

    });


  }