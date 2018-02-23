import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ThreadsService } from '../../services/threads.service';

import { LOAD_USER_DATA_ACTION, UserThreadLoadedAction } from '../actions';


@Injectable()
export class LoadThreadsEffectService {

  constructor(private actions$: Actions, private threadService: ThreadsService) { }

  @Effect() loadAction$ = this.actions$
    .ofType(LOAD_USER_DATA_ACTION)
    .switchMap(() => this.threadService.loadUserThreads())
    .map(allUserData => new UserThreadLoadedAction(allUserData));

}
