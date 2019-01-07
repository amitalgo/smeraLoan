import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PreferedbankPage } from '../preferedbank/preferedbank';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';

/**
 * Generated class for the LoantermPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loanterm',
  templateUrl: 'loanterm.html',
})
export class LoantermPage {
  
  loanterm: FormGroup;
  token : any;
  response : any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider) {
    this.loanterm = this.formBuilder.group({
      loan_amount: ['', Validators.compose([Validators.required,Validators.pattern('^\\d{1,2}(\\.\\d{1,2})?$')])],
      capital_amount: ['', Validators.compose([Validators.required,Validators.pattern('^\\d{1,2}(\\.\\d{1,2})?$')])],
      other_facility: ['', Validators.required],
      other_facility_amount: ['', Validators.compose([Validators.required,Validators.pattern('^\\d{1,2}(\\.\\d{1,2})?$')])]
    });

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoantermPage');
  }

  checkValid() {
    if(this.loanterm.controls['loan_amount'].valid || this.loanterm.controls['capital_amount'].valid || this.loanterm.controls['other_facility'].valid || this.loanterm.controls['other_facility_amount'].valid) {
      return false;
    } else {
      return true;
    }
  }

  ionViewWillEnter () {
    if(this.lrId!=null && this.laId!=null && this.qcId!=null){
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        this.loanterm.controls['loan_amount'].setValue(this.response.term_loan)
        this.loanterm.controls['capital_amount'].setValue(this.response.working_capital)
        this.loanterm.controls['other_facility'].setValue(this.response.facility_type)
        this.loanterm.controls['other_facility_amount'].setValue(this.response.facility_amount)
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doLoanTerm(){
    localStorage.setItem('termLoan',this.loanterm.value.loan_amount);
    localStorage.setItem('wrkcapitalAmt',this.loanterm.value.capital_amount);
    localStorage.setItem('otherFacType',this.loanterm.value.other_facility);
    localStorage.setItem('otherFacAmt',this.loanterm.value.other_facility_amount);
    this.navCtrl.push(PreferedbankPage);
  }

  doUpdateLoanTerm(){
    console.log("Update Sales Turn Over Function");
    this.sharedProvider.showLoader();
    var params= { "lrId":this.lrId,"laId":this.laId,"qcId":this.qcId,"termLoan": this.loanterm.value.loan_amount,"wrkcapitalAmt":this.loanterm.value.capital_amount,"otherFacType":this.loanterm.value.other_facility,"otherFacAmt":this.loanterm.value.other_facility_amount}
    this.loanApplicationProvider.updateLoanApplication(this.token,params).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('termLoan',this.loanterm.value.loan_amount);
      localStorage.setItem('wrkcapitalAmt',this.loanterm.value.capital_amount);
      localStorage.setItem('otherFacType',this.loanterm.value.other_facility);
      localStorage.setItem('otherFacAmt',this.loanterm.value.other_facility_amount);
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

}
