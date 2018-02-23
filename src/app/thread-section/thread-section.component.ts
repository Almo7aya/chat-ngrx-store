import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { values, last } from 'lodash';


import { ApplicationState } from '../store/application-state';
import { UserThreadLoadedAction, LoadUserDataAction } from '../store/actions';
import { Observable } from 'rxjs/observable';
import { ThreadSummaryVM } from './threadSummary.vm';
import { Thread } from '../../../shared/model/thread';
import { userNameSelector, unReadMessagesSelector, threadSummarySelector } from './selectors';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.scss']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessages$: Observable<number>;
  threadSummarys$: Observable<ThreadSummaryVM[]>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {

    this.store.dispatch(new LoadUserDataAction());

    this.userName$ = this.store
      .map(userNameSelector);

    this.unreadMessages$ = this.store
      .map(unReadMessagesSelector);

    // This is with mapState to Observale
    this.threadSummarys$ = this.store
      .map(threadSummarySelector);

  }
}
