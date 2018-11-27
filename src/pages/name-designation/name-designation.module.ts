import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NameDesignationPage } from './name-designation';

@NgModule({
  declarations: [
    NameDesignationPage,
  ],
  imports: [
    IonicPageModule.forChild(NameDesignationPage),
  ],
})
export class NameDesignationPageModule {}
