import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { values, last } from 'lodash';


import { ApplicationState } from '../store/application-state';
import { UserThreadLoadedAction, LoadUserDataAction, SelectCurrentThreadAction } from '../store/actions';
import { Observable } from 'rxjs/observable';
import { ThreadSummaryVM } from './threadSummary.vm';
import { Thread } from '../../../shared/model/thread';
import { environment } from '../../environments/environment';
import {
  userNameSelector,
  unReadMessagesSelector,
  threadSummarySelector,
  currentTheadIdSelector,
  currentUserSelector
} from './threads.selectors';

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.scss']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessages$: Observable<number>;
  threadSummarys$: Observable<ThreadSummaryVM[]>;
  currentThreadId$: Observable<number>;
  currentUserId$: Observable<number>;


  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {

    // this.store.dispatch(new LoadUserDataAction());

    this.userName$ = this.store
      .select(userNameSelector);

    this.unreadMessages$ = this.store
      .select(unReadMessagesSelector);

    // This is with mapState to Observale
    this.threadSummarys$ = this.store
      .select(threadSummarySelector);

    this.currentThreadId$ = this.store
      .select(currentTheadIdSelector);

    this.currentUserId$ = this.store
      .select(currentUserSelector);

  }

  onThreadSelected(selectedThread: { userId: number, threadId: number }) {

    if (!environment.production) {
      console.log('Selected thread id => ', selectedThread);
    }

    this.store.dispatch(new SelectCurrentThreadAction({ currentThreadId: selectedThread.threadId, currentUserId: selectedThread.userId }));

  }

}
