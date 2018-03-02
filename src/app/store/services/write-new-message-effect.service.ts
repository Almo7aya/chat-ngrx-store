import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ThreadsService } from '../../services/threads.service';
import { SEND_NEW_MESSAGE_ACTION, SendNewMessageAction, ErrorHappenAction } from '../actions/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) { }

  @Effect({ dispatch: false }) sendNewMessageAction$ =
    this.actions$
      .ofType(SEND_NEW_MESSAGE_ACTION)
      .debug('SEND NEW MESSAGE')
      .switchMap((action: SendNewMessageAction) => this.threadsService.saveNewMessage(action.payload))
      .catch(() => Observable.of(new ErrorHappenAction('Error Happen When Saving a message to the server')));
}
