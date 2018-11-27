import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyNamePage } from './company-name';

@NgModule({
  declarations: [
    CompanyNamePage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyNamePage),
  ],
})
export class CompanyNamePageModule {}
