import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectionComponent } from './election/election.component';
import { SurveyComponent } from './survey/survey.component';
import { VideoComponent } from './video/video.component';
import { MessageComponent } from './message/message.component';
import { ResultComponent } from './result/result.component';
import { FormsModule } from '@angular/forms';
import { EventosComponent } from './eventos/eventos.component';

@NgModule({
  declarations: [
    AppComponent,
    ElectionComponent,
    SurveyComponent,
    VideoComponent,
    MessageComponent,
    ResultComponent,
    EventosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
