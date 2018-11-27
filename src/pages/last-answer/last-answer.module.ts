import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LastAnswerPage } from './last-answer';

@NgModule({
  declarations: [
    LastAnswerPage,
  ],
  imports: [
    IonicPageModule.forChild(LastAnswerPage),
  ],
})
export class LastAnswerPageModule {}
