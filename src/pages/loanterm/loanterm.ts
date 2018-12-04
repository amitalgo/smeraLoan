import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { PreferedbankPage } from '../preferedbank/preferedbank';

/**
 * Generated class for the LoantermPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loanterm',
  templateUrl: 'loanterm.html',
})
export class LoantermPage {
  
  loanterm: FormGroup;
  loan_amount : AbstractControl;
  capital_amount:AbstractControl;
  other_facility:AbstractControl;
  other_facility_amount:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.loanterm = this.formBuilder.group({
      loan_amount: ['', Validators.required],
      capital_amount: ['', Validators.required],
      other_facility: ['', Validators.required],
      other_facility_amount: ['', Validators.required]
    });

    this.loan_amount = this.loanterm.controls['loan_amount'];
    this.capital_amount = this.loanterm.controls['capital_amount'];
    this.other_facility = this.loanterm.controls['other_facility'];
    this.other_facility_amount = this.loanterm.controls['other_facility_amount'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoantermPage');
  }

  doLoanTerm(){
    console.log("Long Term");
    this.navCtrl.setRoot(PreferedbankPage);
  }

}
