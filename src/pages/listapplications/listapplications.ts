import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { ApplicationanswerPage } from '../applicationanswer/applicationanswer';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the ListapplicationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listapplications',
  templateUrl: 'listapplications.html',
})
export class ListapplicationsPage {

  public applications : any;
  public token :string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider) {
    this.token=localStorage.getItem('token');
    console.log(this.token);
    this.getAllApplication();
  }
  
  ionViewWillEnter () {
    this.menuCtrl.enable (true, "myMenu");
  }

  getAllApplication(){
    this.sharedProvider.showLoader()
    this.loanApplicationProvider.allApplication(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.applications = result  
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log('Inside Error');
      console.log(err);
    });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListapplicationsPage');
  }

  previewAnswer(lr_id,la_id,qc_id){

    this.sharedProvider.showLoader()
    this.loanApplicationProvider.getQuestionariesAnswer(this.token,{"lrId":lr_id,"laId":la_id,"qcId":qc_id}).then(result=>{
      this.sharedProvider.dismissLoader()
      this.navCtrl.setRoot(ApplicationanswerPage,{
        "questions":result
      }); 
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log('Inside Error');
      console.log(err);
    });
  }

  goBack(){
    this.navCtrl.setRoot(DashboardPage);
  }

}
