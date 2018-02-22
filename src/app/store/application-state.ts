import { DataState, INITIAL_DATA_STATE } from "./data-state";
import { UiState, INITIAL_UI_STATE } from "./ui-state";

export interface ApplicationState {
  dataState: DataState;
  uiState: UiState;
}


export const INITIAL_APPLICATION_STATE: ApplicationState = {
  dataState: INITIAL_DATA_STATE,
  uiState: INITIAL_UI_STATE
}