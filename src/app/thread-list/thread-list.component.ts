import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { ThreadSummaryVM } from '../thread-section/threadSummary.vm';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {

  @Input() threadSummarys: ThreadSummaryVM;

  @Input() currentThreadId: number;

  @Output() threadSelectedEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }


}
