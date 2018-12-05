import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FewdocumentPage } from '../fewdocument/fewdocument';

/**
 * Generated class for the LoanexistingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loanexisting',
  templateUrl: 'loanexisting.html',
})
export class LoanexistingPage {

  existingloan: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.existingloan = this.formBuilder.group({
      loan_facility: ['', Validators.required],
      loan_amount: ['', Validators.required],
      interest: ['', Validators.required],
      bank_name: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanexistingPage');
  }

  doExistingLoan(){
    console.log("Loan Exisitng");
    this.navCtrl.setRoot(FewdocumentPage);
  }

  noLoan(){
    console.log("No Existing Loan");
    this.navCtrl.setRoot(FewdocumentPage);
  }

}
