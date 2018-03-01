import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ThreadsService } from '../../services/threads.service';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../../../shared/model/message';
import { NewMessagesReceiveAction, SELECT_CURRENT_USER_ACTION } from '../actions';
import { ApplicationState } from '../application-state';
import { Store } from '@ngrx/store';

@Injectable()
export class ServerNotifactionEffectService {



  constructor(private actions$: Actions, private threadsService: ThreadsService, private store: Store<ApplicationState>) { }


  @Effect() newMessages$ = Observable.interval(3000)
    .debug('CHACKING FOR A NEW MESSAGES ')
    .withLatestFrom(this.store.select(state => state.uiState.userId))
    .map(([any, userId]) => userId)
    .filter(userId => !!userId)
    .debug('GTTING THE NEW MASSAGES via HTTP FOR USER ')
    .switchMap((userId) => this.threadsService.loadNewMessagesForUser(userId))
    .debug('RECIEVING NEW MESSAGES ')
    .withLatestFrom(this.store.select('uiState'))
    .map(([newMessages, uiState]) => new NewMessagesReceiveAction({ newMessages, uiState }));
}
