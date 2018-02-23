import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApplicationState } from '../store/application-state';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    // this.store.subscribe(e => console.log('Reciving data in message section'));
  }

}
