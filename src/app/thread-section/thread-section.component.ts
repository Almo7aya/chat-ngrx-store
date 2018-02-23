import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { values, last } from 'lodash';

import { ThreadsService } from '../services/threads.service';

import { ApplicationState } from '../store/application-state';
import { LoadUserThreadAction } from '../store/actions';
import { Observable } from 'rxjs/observable';
import { ThreadSummaryVM } from './threadSummary.vm';
import { mapStateToUserName, mapStateToUnReadMessages, mapStateToThreadSummary } from './mapers';
import { Thread } from '../../../shared/model/thread';

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

    // This is with mapState to Observale
    this.threadSummarys$ = this.store
      .skip(1)
      .map(mapStateToThreadSummary);
    this.threadSummarys$.subscribe(console.log);


    // this.threadSummarys$ = this.store.select(state => {

    //   const threads = values<Thread>(state.dataState.threads);

    //   return threads.map((thread): ThreadSummaryVM => {

    //     const names: string[] = Object.keys(thread.participants)
    //       .map(participantId => state.dataState.participants[participantId].name);

    //     const lastMessageId = last<number>(thread.messageIds);
    //     const lastMessage = state.dataState.messages[lastMessageId];

    //     return {
    //       id: thread.id,
    //       lastMessage: lastMessage.text,
    //       participantNames: names.join(', '),
    //       timestamp: lastMessage.timestamp
    //     };
    //   });

    // });

    // this.threadSummarys$.subscribe(console.log);

  }
}
