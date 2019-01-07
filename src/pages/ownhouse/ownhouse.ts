import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoanexistingPage } from '../loanexisting/loanexisting';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the OwnhousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ownhouse',
  templateUrl: 'ownhouse.html',
})
export class OwnhousePage {

  response : any;
  token : any;
  data:any=[];
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private loanApplicationProvider:LoanapplicationProvider,private sharedProvider:SharedProvider) {
    this.token=localStorage.getItem('token');
    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnhousePage');
  }

  doHouse(val){
    this.sharedProvider.showLoader();
    this.data={"home":val};
    this.loanApplicationProvider.updateLoanApplication(this.token,this.data).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      if(this.lrId!=null && this.laId!=null && this.qcId!=null){
        this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
      }else{
        this.navCtrl.push(LoanexistingPage);
      }
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }
}
