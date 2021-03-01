import { VideoComponent } from './video/video.component';
import { SurveyComponent } from './survey/survey.component';
import { ElectionComponent } from './election/election.component';
import { MessageComponent } from './message/message.component';
import { ResultComponent } from './result/result.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MessageComponent },
  { path: 'election', component: ElectionComponent },
  { path: 'message', component: MessageComponent },
  { path: 'result', component: ResultComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'video', component: VideoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
