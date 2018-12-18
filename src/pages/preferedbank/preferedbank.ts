import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OwnhousePage } from '../ownhouse/ownhouse';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { FewdocumentPage } from '../fewdocument/fewdocument';

/**
 * Generated class for the PreferedbankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferedbank',
  templateUrl: 'preferedbank.html',
})
export class PreferedbankPage {

  public data = {};
  token : any;
  response : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sharedProvider:SharedProvider,private loanApplication:LoanapplicationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferedbankPage');
  }

  doProceed(preferedBank){
    this.sharedProvider.showLoader();
    this.data['salesTurnOver']=localStorage.getItem('salesTurnOver');
    this.data['salesTurnPat']=localStorage.getItem('salesTurnPat');
    this.data['termLoan']=localStorage.getItem('termLoan');
    this.data['wrkcapitalAmt']=localStorage.getItem('wrkcapitalAmt');
    this.data['otherFacType']=localStorage.getItem('otherFacType');
    this.data['otherFacAmt']=localStorage.getItem('otherFacAmt')
    this.data['preferedBank']=preferedBank
    this.token=localStorage.getItem('token');

    this.loanApplication.updateLoanApplication(this.token,this.data).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('preferedBank',preferedBank);
      this.navCtrl.push(FewdocumentPage);
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

}
