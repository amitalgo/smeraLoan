import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { FewdocumentPage } from '../fewdocument/fewdocument';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoanexistingPage } from '../loanexisting/loanexisting';
import { OwnhousePage } from '../ownhouse/ownhouse';

/**
 * Generated class for the PreferedbankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-preferedbank',
  templateUrl: 'preferedbank.html',
})
export class PreferedbankPage {

  public data = {};
  otherBank: FormGroup;
  token : any;
  response : any;
  sbi : any='';
  isValid : any = false;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private sharedProvider:SharedProvider,private loanApplicationProvider:LoanapplicationProvider) {
    this.otherBank = this.formBuilder.group({
      other_bank: ['', Validators.required],
    });

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferedbankPage');
  }

  ionViewWillEnter () {
    if(this.lrId!=null && this.laId!=null && this.qcId!=null){
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        if(this.response.preferred_bank!='sbi'){
          this.otherBank.controls['other_bank'].setValue(this.response.preferred_bank)
        }
        // this.navCtrl.popToRoot({ animate: true, direction: 'back' }) 
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doSBI(preferedBank=null){
    localStorage.setItem('preferedBank',preferedBank);
    this.isValid=true;
  }

  doProceed(){
    if(this.otherBank.value.other_bank!='' || localStorage.getItem('preferedBank')==null){
      localStorage.setItem('preferedBank',this.otherBank.value.other_bank);
      this.isValid=true;
    }    
    this.sharedProvider.showLoader();
    this.data['salesTurnOver']=localStorage.getItem('salesTurnOver');
    this.data['salesTurnPat']=localStorage.getItem('salesTurnPat');
    this.data['termLoan']=localStorage.getItem('termLoan');
    this.data['wrkcapitalAmt']=localStorage.getItem('wrkcapitalAmt');
    this.data['otherFacType']=localStorage.getItem('otherFacType');
    this.data['otherFacAmt']=localStorage.getItem('otherFacAmt')
    this.data['preferedBank']=localStorage.getItem('preferedBank');
    
    this.loanApplicationProvider.updateLoanApplication(this.token,this.data).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      this.navCtrl.push(OwnhousePage);
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  } 

  setValue(value:any,$event){
    this.isValid=true;
  }

  doUpdate(){
    console.log('Update Prefered Bank');
    this.sharedProvider.showLoader();
    if(this.otherBank.value.other_bank!='' || localStorage.getItem('preferedBank')==null){
      localStorage.setItem('preferedBank',this.otherBank.value.other_bank);
      this.isValid=true;
    }    
    this.data['preferedBank']=localStorage.getItem('preferedBank');
    this.data['lrId']=this.lrId;
    this.data['laId']=this.laId;
    this.data['qcId']=this.qcId;
    this.loanApplicationProvider.updateLoanApplication(this.token,this.data).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
    
  }

}
