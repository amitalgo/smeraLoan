import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListapplicationsPage } from './listapplications';

@NgModule({
  declarations: [
    ListapplicationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListapplicationsPage),
  ],
})
export class ListapplicationsPageModule {}
