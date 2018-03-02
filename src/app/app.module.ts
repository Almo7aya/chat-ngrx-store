import { storeFreeze } from 'ngrx-store-freeze';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule, MetaReducer } from '@ngrx/store';
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
import { ScrollToBottomDirective } from './directives/scroll-to-bottom.directive';
import { WriteNewMessageEffectService } from './store/services/write-new-message-effect.service';
import { ServerNotifactionEffectService } from './store/services/server-notifaction-effect.service';
import { MarkMessagesAsReadEffectService } from './store/services/mark-thread-as-read-effect.service';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { environment } from '../environments/environment';



const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [storeFreeze] : [];


@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent,
    ScrollToBottomDirective,
    ErrorMessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.forRoot(mapReducers, { initialState: INITIAL_APPLICATION_STATE, metaReducers }),
    EffectsModule.forRoot([LoadThreadsEffectService,
      WriteNewMessageEffectService,
      ServerNotifactionEffectService,
      MarkMessagesAsReadEffectService]),
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  providers: [
    ThreadsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
