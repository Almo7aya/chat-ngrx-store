import { Component, OnInit, Input } from '@angular/core';
import { MessageVM } from '../message-section/message.vm';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input() messagesList: MessageVM[];

  constructor() { }

  ngOnInit() {
  }

}
