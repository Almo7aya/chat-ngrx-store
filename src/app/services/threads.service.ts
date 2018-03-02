import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AllUserData } from '../../../shared/to/all-user-data';
import { INITIAL_DATA_STATE } from '../store/data-state';
import { Message } from '../../../shared/model/message';
import { MessageToBeSendPayload } from '../store/actions';

import { commonHttpHeaders } from './common-http-headers';
import { SelectCurrentThreadPayload } from '../store/actions/index';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }


  loadUserThreads(userId?: number): Observable<AllUserData> {
    if (!userId) {
      return Observable.of(<AllUserData>INITIAL_DATA_STATE);
    }
    return this.http.get('/apiv1/threads', { headers: commonHttpHeaders(userId) })
      .map((res: Response) => res.json());
  }

  saveNewMessage(newMessage: MessageToBeSendPayload): Observable<any> {
    return this.http.post(`/apiv1/threads/${newMessage.threadId}`, JSON.stringify({
      text: newMessage.text
    }), { headers: commonHttpHeaders(newMessage.participantId) });
  }

  loadNewMessagesForUser(userId): Observable<Message[]> {
    return this.http.post('/apiv1/notifications/messages',
      null,
      { headers: commonHttpHeaders(userId) })
      .map((res: Response) => res.json().payload);
  }

  markThreadAsRead(selectedThread: SelectCurrentThreadPayload): Observable<any> {
    const { currentThreadId, currentUserId } = selectedThread;
    return this.http.patch(`/apiv1/threads/${currentThreadId}`,
      { read: true },
      { headers: commonHttpHeaders(currentUserId) });
  }

}
