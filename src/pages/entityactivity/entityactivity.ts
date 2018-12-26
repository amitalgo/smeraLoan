import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SelectSearchableComponent } from 'ionic-select-searchable';

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

@Component({
  selector: 'page-entityactivity',
  templateUrl: 'entityactivity.html',
})
export class EntityactivityPage {

  @ViewChild('myselect') selectComponent:SelectSearchableComponent;
  indus = null;
  userIds = [];

  entityactivity: FormGroup;
  token : any;
  industries : any;
  response : any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public entityProvider:EntityProvider,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider,private toastCtrl : ToastController) {
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
    if(this.lrId!=null && this.laId!=null && this.qcId!=null){
      console.log('Entered View');
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        // console.log('Industry is:' + JSON.stringify(this.response));
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
    console.log(this.entityactivity.value)
    localStorage.setItem('activity',this.entityactivity.value.activity);
    localStorage.setItem('industry',this.entityactivity.value.industry.subindustry_name);
    this.navCtrl.push(PandetailsPage);
  }

  doUpdateEntityActivity(){
    console.log("Update Entity Activity Function");
    this.sharedProvider.showLoader();
    this.entityactivity.value['lrId']=this.lrId;
    this.entityactivity.value['laId']=this.laId;
    this.entityactivity.value['qcId']=this.qcId;
    var params={"activity":this.entityactivity.value.activity,"industry":this.entityactivity.value.industry.subindustry_name}
    this.entityProvider.updateEntity(this.token,params).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('activity',this.entityactivity.value.activity);
    localStorage.setItem('industry',this.entityactivity.value.industry.subindustry_name);
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

  // Searchable Select Box 
  userChanged(event: { component :SelectSearchableComponent,value:any}){
    console.log('event',event);
  }

  onClose(){
    let toast = this.toastCtrl.create({
      message : 'Thanks For selection',
      duration : 2000 
    });
    toast.present();
  }

  openFromCode(){
    this.selectComponent.open();
  }

}
