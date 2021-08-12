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
import { ErrorComponent } from './shared/error/error.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { SafeHtmlPipe } from './shared/pipe/safeHtml.pipe';
import { StatsComponent } from './stats/stats.component';
import { ChartsModule } from 'ng2-charts';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    ElectionComponent,
    SurveyComponent,
    VideoComponent,
    MessageComponent,
    ResultComponent,
    EventosComponent,
    TopBarComponent,
    ErrorComponent,
    SafeHtmlPipe,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzDatePickerModule,
    ChartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule {}
