import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { ThatsnicePage } from '../thatsnice/thatsnice';

/**
 * Generated class for the CompanynamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-companyname',
  templateUrl: 'companyname.html',
})
export class CompanynamePage {

  private company: FormGroup;
  company_name: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.company = this.formBuilder.group({
      company_name: ['', Validators.required],
    });

    this.company_name = this.company.controls['name'];
  }

  doCompany(){
    console.log("CompanySubmit");
    this.navCtrl.setRoot(ThatsnicePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanynamePage');
  }

}
