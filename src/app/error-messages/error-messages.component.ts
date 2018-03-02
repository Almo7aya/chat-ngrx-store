import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {

  @HostBinding('class.show') showMessage: boolean;

  message$: Observable<String>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.message$ = this.store.select(state => state.uiState.currentError)
      .skip(1)
      .do(() => {
        this.showMessage = true;
        setTimeout(() => this.showMessage = false, 2000);
      });
  }

  close() {
    this.showMessage = false;
  }

}
