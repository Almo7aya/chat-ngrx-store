import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';

import { ThreadsService } from './services/threads.service';
import { ApplicationState, INITIAL_APPLICATION_STATE } from './store/application-state';
import { UiState } from './store/ui-state';
import { DataState } from './store/data-state';
import { mapReducers } from './store/reducers';
import { LoadThreadsEffectService } from './store/services/load-threads-effect.service';


@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.forRoot(mapReducers, { initialState: INITIAL_APPLICATION_STATE }),
    EffectsModule.forRoot([LoadThreadsEffectService]),
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  providers: [
    ThreadsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
