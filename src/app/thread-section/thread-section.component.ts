import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { values } from 'lodash';

import { ThreadsService } from '../services/threads.service';

import { ApplicationState } from '../store/application-state';
import { LoadUserThreadAction } from '../store/actions';
import { Observable } from 'rxjs/observable';
import { Thread } from '../../../shared/model/thread';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessages$: Observable<number>;

  constructor(private threadService: ThreadsService,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    // dispatch the action then its ready
    this.threadService.loadUserThreads()
      .subscribe(allUserData => this.store
        .dispatch(new LoadUserThreadAction(allUserData)));


    this.userName$ = this.store
      .skip(1) // to skip the first init emit
      .map(this.mapStateToUserName);

    this.unreadMessages$ = this.store
      .skip(1)
      .map(this.mapStateToUnReadMessages);

  }


  private mapStateToUserName(state: ApplicationState): string {
    const { userId: currentUserId } = state.uiState;
    return state.dataState.participants[currentUserId].name;
  }

  private mapStateToUnReadMessages(state: ApplicationState): number {
    const { userId: currentUserId } = state.uiState;
    return values<Thread>(state.dataState.threads)
      .reduce((acc, thread: Thread) => acc + thread.participants[currentUserId], 0);
  }


}
