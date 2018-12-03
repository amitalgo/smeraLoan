import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PandetailsPage } from './pandetails';

@NgModule({
  declarations: [
    PandetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PandetailsPage),
  ],
})
export class PandetailsPageModule {}
