import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { ApplicationState } from '../store/application-state';
import { MessageVM } from './message.vm';
import { participantNamesSelector } from './messages.selectors';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {

    this.participantNames$ = this.store
      .select(participantNamesSelector)
      .debug('NAMES =>');
  }

}
