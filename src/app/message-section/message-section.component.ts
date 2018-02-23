import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApplicationState } from '../store/application-state';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

  participantNames$: string;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {

  }

}
