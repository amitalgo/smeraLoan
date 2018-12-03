import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnhousePage } from './ownhouse';

@NgModule({
  declarations: [
    OwnhousePage,
  ],
  imports: [
    IonicPageModule.forChild(OwnhousePage),
  ],
})
export class OwnhousePageModule {}
