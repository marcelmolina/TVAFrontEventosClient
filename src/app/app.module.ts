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
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './shared/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ElectionComponent,
    SurveyComponent,
    VideoComponent,
    MessageComponent,
    ResultComponent,
    EventosComponent,
    TopBarComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
