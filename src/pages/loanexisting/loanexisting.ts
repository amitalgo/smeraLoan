import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
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
  loan_facility : AbstractControl;
  loan_amount:AbstractControl;
  interest:AbstractControl;
  bank_name:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.existingloan = this.formBuilder.group({
      loan_facility: ['', Validators.required],
      loan_amount: ['', Validators.required],
      interest: ['', Validators.required],
      bank_name: ['', Validators.required],
    });

    this.loan_facility = this.existingloan.controls['loan_facility'];
    this.loan_amount = this.existingloan.controls['loan_amount'];
    this.interest = this.existingloan.controls['interest'];
    this.bank_name = this.existingloan.controls['bank_name'];
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
