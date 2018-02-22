import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { ThreadsService } from '../services/threads.service';

import { ApplicationState } from '../store/application-state';
import { LoadUserThreadAction } from '../store/actions';
import { Observable } from 'rxjs/observable';
import { ThreadSummaryVM } from './threadSummary.vm';
import { mapStateToUserName, mapStateToUnReadMessages, mapStateToThreadSummary } from './mapers';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.scss']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessages$: Observable<number>;
  threadSummarys$: Observable<ThreadSummaryVM[]>;

  constructor(private threadService: ThreadsService,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    // dispatch the action then its ready
    this.threadService.loadUserThreads()
      .subscribe(allUserData => this.store
        .dispatch(new LoadUserThreadAction(allUserData)));


    this.userName$ = this.store
      .skip(1) // to skip the first init emit
      .map(mapStateToUserName);

    this.unreadMessages$ = this.store
      .skip(1)
      .map(mapStateToUnReadMessages);

    this.threadSummarys$ = this.store
      .skip(1)
      .map(mapStateToThreadSummary);
  }

}
