import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { ApplicationState } from '../store/application-state';
import { MessageVM } from './message.vm';
import { participantNamesSelector, messageSelector } from './messages.selectors';
import { SendNewMessageAction } from '../store/actions/index';
import { UiState } from '../store/ui-state';
import { clone } from 'lodash';

@Component({
  selector: 'app-message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.scss']
})
export class MessageSectionComponent implements OnInit {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;

  uiState: UiState;


  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {

    this.participantNames$ = this.store
      .select(participantNamesSelector)
      .debug('NAMES =>');


    this.messages$ = this.store
      .select(messageSelector)
      .debug('MESSAGES => ');

    this.store.subscribe(store => this.uiState = clone(store.uiState));

  }


  onNewMessage(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.store.dispatch(new SendNewMessageAction({
        text: event.target.value,
        threadId: this.uiState.currentThreadId,
        participantId: this.uiState.userId
      }));
      event.target.value = '';
    }
  }

}
