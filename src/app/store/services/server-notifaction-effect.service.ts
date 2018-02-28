import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ThreadsService } from '../../services/threads.service';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../../../shared/model/message';
import { NewMessagesReceiveAction } from '../actions';

@Injectable()
export class ServerNotifactionEffectService {



  constructor(private actions$: Actions, private threadsService: ThreadsService) { }

  @Effect() newMessages$ = Observable.interval(3000)
    .debug('CHACKING FOR A NEW MESSAGES ')
    .switchMap(() => this.threadsService.loadNewMessagesForUser())
    .debug('RECIEVING NEW MESSAGES ')
    .map((messages: Message[]) => new NewMessagesReceiveAction(messages));
}
