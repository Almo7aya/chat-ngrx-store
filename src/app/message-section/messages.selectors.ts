import { ApplicationState } from "../store/application-state";
import { values, keys } from "lodash";

import { MessageVM } from "./message.vm";
import { Participant } from "../../../shared/model/participant";


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


export const message =
  (state: ApplicationState): MessageVM => {

    return;
  }