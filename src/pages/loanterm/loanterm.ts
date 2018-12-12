import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.loanterm = this.formBuilder.group({
      loan_amount: ['', Validators.required],
      capital_amount: ['', Validators.required],
      other_facility: ['', Validators.required],
      other_facility_amount: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoantermPage');
  }

  doLoanTerm(){
    localStorage.setItem('termLoan',this.loanterm.value.loan_amount);
    localStorage.setItem('wrkcapitalAmt',this.loanterm.value.capital_amount);
    localStorage.setItem('otherFacType',this.loanterm.value.other_facility);
    localStorage.setItem('otherFacAmt',this.loanterm.value.other_facility_amount);
    this.navCtrl.setRoot(PreferedbankPage);
  }

}
