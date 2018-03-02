import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ThreadsService } from '../../services/threads.service';
import { SELECT_CURRENT_THREAD_ACTION, SelectCurrentThreadPayload, SelectCurrentThreadAction } from '../actions/index';

@Injectable()
export class MarkMessagesAsReadEffectService {

  constructor(private actions$: Actions, private threadService: ThreadsService) { }


  @Effect({ dispatch: false }) markThreadAsRead$ = this.actions$
    .ofType(SELECT_CURRENT_THREAD_ACTION)
    .switchMap((selectedThread: SelectCurrentThreadAction) => this.threadService.markThreadAsRead(selectedThread.payload));

}
