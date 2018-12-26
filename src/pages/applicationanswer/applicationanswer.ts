import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { ListapplicationsPage } from '../listapplications/listapplications';
import { StartoperationsPage } from '../startoperations/startoperations';
import { EntitytypePage } from '../entitytype/entitytype';
import { EntitylocatedPage } from '../entitylocated/entitylocated';
import { EntityactivityPage } from '../entityactivity/entityactivity';
import { PandetailsPage } from '../pandetails/pandetails';
import { EntityturnoverPage } from '../entityturnover/entityturnover';
import { LoantermPage } from '../loanterm/loanterm';
import { PreferedbankPage } from '../preferedbank/preferedbank';
import { LoanexistingPage } from '../loanexisting/loanexisting';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
/**
 * Generated class for the ApplicationanswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-applicationanswer',
  templateUrl: 'applicationanswer.html',
})
export class ApplicationanswerPage {
  information: any = [];
  laId : any;
  qcId : any;
  lrId : any;
  token : any;
  pages : any = {
    'StartoperationsPage' : StartoperationsPage,
    'EntitytypePage' : EntitytypePage,
    'EntitylocatedPage' : EntitylocatedPage,
    'EntityactivityPage' : EntityactivityPage,
    'PandetailsPage' : PandetailsPage,
    'EntityturnoverPage' : EntityturnoverPage,
    'LoantermPage' : LoantermPage,
    'PreferedbankPage' : PreferedbankPage,
    'LoanexistingPage' : LoanexistingPage
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,private menuCtrl:MenuController,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider) {
    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');
  }

  ionViewWillEnter () {
    this.menuCtrl.enable (true, "myMenu");
    // this.information=this.navParams.get('questions');   
    if(this.lrId!=null && this.laId!=null && this.qcId!=null){
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getQuestionariesAnswer(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.information=result
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  editQuestion(index,page,lrId,laId,qcId){
    // console.log('Index is :' +index);
    // console.log("Page is" + page);
    // console.log('Lr Id' +lrId)
    // console.log('La Id is :' +laId);
    // console.log('Qc Id is:' +qcId);
    this.navCtrl.push(this.pages[page],{
      "lrId":lrId,
      "laId":laId,
      "qcId":qcId,
      "index":index
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationanswerPage');
  }

  goBack(){
    // console.log("Go Back Button");
    this.navCtrl.setRoot(ListapplicationsPage);
  }

}
