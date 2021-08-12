import { EventosComponent } from './eventos/eventos.component';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { SurveyComponent } from './survey/survey.component';
import { ElectionComponent } from './election/election.component';
import { MessageComponent } from './message/message.component';
import { ResultComponent } from './result/result.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: 'eventos', component: EventosComponent },
  { path: 'eventos/:id', component: EventosComponent },
  { path: 'eventos/:id/:token', component: EventosComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'stats/:id', component: StatsComponent },
  {
    path: '',
    redirectTo: 'stats',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'stats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
