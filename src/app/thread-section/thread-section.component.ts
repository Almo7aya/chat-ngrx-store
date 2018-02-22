import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ThreadsService } from '../services/threads.service';

import { ApplicationState } from '../store/application-state';
import { LoadUserThreadAction } from '../store/actions';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName: string;

  constructor(private threadService: ThreadsService,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    // dispatch the action then its ready
    this.threadService.loadUserThreads()
      .subscribe(allUserData => this.store
        .dispatch(new LoadUserThreadAction(allUserData)));


    this.store.subscribe((state: ApplicationState) => {
      this.userName = state.dataState.participants[state.uiState.userId].name;
    });

  }

}
