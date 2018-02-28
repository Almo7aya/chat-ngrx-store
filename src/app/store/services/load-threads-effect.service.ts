import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ThreadsService } from '../../services/threads.service';

import { LOAD_USER_DATA_ACTION, UserThreadLoadedAction } from '../actions';
import { SELECT_CURRENT_USER_ACTION, SelectCurrenUserAction, LoadUserDataAction } from '../actions/index';


@Injectable()
export class LoadThreadsEffectService {

  constructor(private actions$: Actions, private threadService: ThreadsService) { }

  @Effect() loadUserThreadAction$ = this.actions$
    .ofType(LOAD_USER_DATA_ACTION)
    .debug('LOAD USER DATA ACTION')
    .switchMap((userToDownlad: LoadUserDataAction) => this.threadService.loadUserThreads(userToDownlad.payload))
    .debug('LOAD USER THREAD')
    .map(allUserData => new UserThreadLoadedAction(allUserData));


  @Effect() selectUserAction$ = this.actions$
    .ofType(SELECT_CURRENT_USER_ACTION)
    .map((selectedUser: SelectCurrenUserAction) => new LoadUserDataAction(selectedUser.payload));

}
