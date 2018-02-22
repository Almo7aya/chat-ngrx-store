import { Thread } from "../model/thread";
import { Message } from "../model/message";
import { Participant } from "../model/participant";

export interface AllUserData {
  theards: Thread[];
  messages: Message[];
  participants: Participant[];
}