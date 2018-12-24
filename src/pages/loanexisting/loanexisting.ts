import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FewdocumentPage } from '../fewdocument/fewdocument';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the LoanexistingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loanexisting',
  templateUrl: 'loanexisting.html',
})
export class LoanexistingPage {

  existingloan: FormGroup;
  existingLoanData : any = [];
  token : any;
  response : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private loanApplicationProvider:LoanapplicationProvider,public sharedProvider:SharedProvider) {
    this.existingloan = this.formBuilder.group({
      loan_facility: ['', Validators.required],
      loan_amount: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
      interest: ['', Validators.required],
      bank_name: ['', Validators.required],
    });

    this.token=localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanexistingPage');
  }

  doExistingLoan(){
    console.log("Loan Exisitng");
    this.sharedProvider.showLoader();
    this.existingLoanData.push(this.existingloan.value)
    console.log(this.existingLoanData);
    this.loanApplicationProvider.updateExistingApplication(this.token,this.existingLoanData).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      if (this.response.message == "ok") {
        this.navCtrl.push(FewdocumentPage);
      } else {
        this.sharedProvider.presentToast(this.response.message);
      }
    }).catch(err => {
        console.log(err)
        this.sharedProvider.dismissLoader();
        this.sharedProvider.presentToast("Something went wrong")
        LoanexistingPage
    });
    
  }

  doAddMore(){
    this.existingLoanData.push(this.existingloan.value)
    this.existingloan.reset()
  }

  noLoan(){
    console.log("No Existing Loan");
    // this.navCtrl.setRoot(FewdocumentPage);
  }

}
