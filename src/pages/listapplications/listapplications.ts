import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { ApplicationanswerPage } from '../applicationanswer/applicationanswer';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { DashboardPage } from '../dashboard/dashboard';
import { StartoperationsPage } from '../startoperations/startoperations';

/**
 * Generated class for the ListapplicationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listapplications',
  templateUrl: 'listapplications.html',
})
export class ListapplicationsPage {

  public applications : any;
  public token :string;
  public response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider) {
    this.token=localStorage.getItem('token');
  }
  
  ionViewWillEnter () {
    this.menuCtrl.enable (true, "myMenu");
    this.getAllApplication();
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

  addNewApplication(){
    console.log('Add New Entity');
    this.sharedProvider.showLoader()
    this.loanApplicationProvider.addNewApplication(this.token,{"email":localStorage.getItem('email')}).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response=result
       if(this.response.message=='ok'){
        this.navCtrl.push(StartoperationsPage)
       }else{
        this.sharedProvider.presentToast(this.response.message)   
       }
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
