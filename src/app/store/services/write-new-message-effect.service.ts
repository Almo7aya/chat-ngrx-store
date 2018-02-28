import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ThreadsService } from '../../services/threads.service';
import { SEND_NEW_MESSAGE_ACTION, SendNewMessageAction } from '../actions/index';

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) { }

  @Effect({ dispatch: false }) sendNewMessageAction$ =
    this.actions$
      .ofType(SEND_NEW_MESSAGE_ACTION)
      .debug('SEND NEW MESSAGE')
      .switchMap((action: SendNewMessageAction) => this.threadsService.saveNewMessage(action.payload));
}
