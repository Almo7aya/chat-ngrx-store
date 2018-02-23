import { Component, OnInit, Input } from '@angular/core';
import { ThreadSummaryVM } from '../thread-section/threadSummary.vm';

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {

  @Input() threadSummarys: ThreadSummaryVM;

  constructor() { }

  ngOnInit() {

  }

}
