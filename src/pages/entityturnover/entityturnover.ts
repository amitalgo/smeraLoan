import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoanrequirementPage } from '../loanrequirement/loanrequirement';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { EntityProvider } from '../../providers/entity/entity';

/**
 * Generated class for the EntityturnoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entityturnover',
  templateUrl: 'entityturnover.html',
})
export class EntityturnoverPage {

  entityturnover: FormGroup;
  token : any;
  response : any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider,) {
    this.entityturnover = this.formBuilder.group({
      turnOver: ['', Validators.required],
      pan_year: ['', Validators.required],
      pat: ['', Validators.required],
      pat_year: ['', Validators.required],
    });

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityturnoverPage');
  }

  ionViewWillEnter () {
    if(this.lrId!='' && this.laId!='' && this.qcId!=''){
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        this.entityturnover.controls['turnOver'].setValue(this.response.turn_over)
        this.entityturnover.controls['pat'].setValue(this.response.pat)
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doEntityTurnover(){
    localStorage.setItem('salesTurnOver',this.entityturnover.value.turnOver);
    localStorage.setItem('salesEntityYr',this.entityturnover.value.pan_year);
    localStorage.setItem('salesTurnPat',this.entityturnover.value.pat);
    localStorage.setItem('salesPatYr',this.entityturnover.value.pat_year);
    this.navCtrl.push(LoanrequirementPage);
  }

  doUpdateEntityTurnover(){
    console.log("Update Sales Turn Over Function");
    this.sharedProvider.showLoader();

    var params= { "lrId":this.lrId,"laId":this.laId,"qcId":this.qcId,"salesTurnOver": this.entityturnover.value.turnOver,"salesTurnPat":this.entityturnover.value.pat}
    this.loanApplicationProvider.updateLoanApplication(this.token,params).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('salesTurnOver',this.entityturnover.value.turnOver);
      localStorage.setItem('salesTurnPat',this.entityturnover.value.pat);
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

}
