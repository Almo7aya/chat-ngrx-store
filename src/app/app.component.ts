import { Component } from '@angular/core';
import { ApplicationState } from './store/application-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentRoute$: Observable<string>;

  constructor(private store: Store<ApplicationState>) {
    this.currentRoute$ = this.store.select(state => {
      return state.routerState.state ? state.routerState.state.url : '';
    });
  }
}
