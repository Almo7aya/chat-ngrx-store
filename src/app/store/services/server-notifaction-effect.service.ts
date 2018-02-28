import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ThreadsService } from '../../services/threads.service';

@Injectable()
export class ServerNotifactionEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) { }

}
