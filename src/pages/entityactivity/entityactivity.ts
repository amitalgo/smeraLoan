import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PandetailsPage } from '../pandetails/pandetails';
import { EntityProvider } from '../../providers/entity/entity';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
/**
 * Generated class for the EntityactivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entityactivity',
  templateUrl: 'entityactivity.html',
})
export class EntityactivityPage {

  entityactivity: FormGroup;
  token : any;
  industries : any;
  response : any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public entityProvider:EntityProvider,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider) {
    this.entityactivity = this.formBuilder.group({
      activity: ['', Validators.required],
      industry: ['', Validators.required],
    });

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');
    this.getIndustry();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityactivityPage');
  }

  ionViewWillEnter () {
    if(this.lrId!='' && this.laId!='' && this.qcId!=''){
      console.log('Entered View');
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        console.log(this.response.industry);
        this.entityactivity.controls['activity'].setValue(this.response.activity)
        this.entityactivity.controls['industry'].setValue(this.response.industry)
        // this.navCtrl.popToRoot({ animate: true, direction: 'back' }) 
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  getIndustry(){
    this.entityProvider.getIndustry(this.token).then(result=>{
      this.industries = result  
    }).catch(err=>{
      console.log('Inside Error');
      console.log(err);
    });
  }

  doEntityActivity(){
    localStorage.setItem('activity',this.entityactivity.value.activity);
    localStorage.setItem('industry',this.entityactivity.value.industry);
    this.navCtrl.push(PandetailsPage);
  }

  doUpdateEntityActivity(){
    console.log("Update Entity Activity Function");
    this.sharedProvider.showLoader();
    this.entityactivity.value['lrId']=this.lrId;
    this.entityactivity.value['laId']=this.laId;
    this.entityactivity.value['qcId']=this.qcId;

    this.entityProvider.updateEntity(this.token,this.entityactivity.value).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('activity',this.entityactivity.value.activity);
    localStorage.setItem('industry',this.entityactivity.value.industry);
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

}
