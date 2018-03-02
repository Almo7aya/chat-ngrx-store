import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MessageVM } from '../message-section/message.vm';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnInit {

  @Input() messagesList: MessageVM[];

  constructor() { }

  ngOnInit() {
  }

}
