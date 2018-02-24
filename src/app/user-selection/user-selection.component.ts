import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { SelectCurrenUserAction } from '../store/actions/index';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  onSelectUser(selectedUserId: number) {
    this.store.dispatch(new SelectCurrenUserAction(selectedUserId));
  }

}
