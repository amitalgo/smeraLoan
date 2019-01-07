import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SelectSearchableComponent } from 'ionic-select-searchable';

import { EntityactivityPage } from '../entityactivity/entityactivity';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { EntityProvider } from '../../providers/entity/entity';

/**
 * Generated class for the EntitylocatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-entitylocated',
  templateUrl: 'entitylocated.html',
})
export class EntitylocatedPage {

  @ViewChild('myselect') selectComponent:SelectSearchableComponent;
  city = null;
  userIds = [];

  entitylocated: FormGroup;
  response : any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;
  token:any;
  cities:any;

  constructor(public navCtrl: NavController,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider ,public navParams: NavParams,private entityProvider:EntityProvider,private formBuilder: FormBuilder,private toastCtrl : ToastController) {
    this.entitylocated = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{6,6}$')])]
    });
    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');
    this.getCity();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntitylocatedPage');
  }

  getCity(){
    this.entityProvider.getCity(this.token).then(result=>{
      this.cities = result  
    }).catch(err=>{
      console.log('Inside Error');
      console.log(err);
    });
  }

  ionViewWillEnter () {
    if(this.lrId!=null && this.laId!=null && this.qcId!=null){
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        this.entitylocated.controls['address'].setValue(this.response.address)
        this.entitylocated.controls['city'].setValue(this.response.city)
        this.entitylocated.controls['pincode'].setValue(this.response.pincode)
        // this.navCtrl.popToRoot({ animate: true, direction: 'back' }) 
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doEntityLocated(){
    this.entitylocated.value.city=this.entitylocated.value.city.city_name
    localStorage.setItem('address',this.entitylocated.value.address);
    localStorage.setItem('city',this.entitylocated.value.city);
    localStorage.setItem('pincode',this.entitylocated.value.pincode);
    this.navCtrl.push(EntityactivityPage);
  }

  doUpdateEntityLocated(){
    console.log("Update Entity Location Function");
    this.sharedProvider.showLoader();
    this.entitylocated.value['lrId']=this.lrId;
    this.entitylocated.value['laId']=this.laId;
    this.entitylocated.value['qcId']=this.qcId;
    this.entitylocated.value.city=this.entitylocated.value.city.city_name

    this.entityProvider.updateEntity(this.token,this.entitylocated.value).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('address',this.entitylocated.value.address);
      localStorage.setItem('city',this.entitylocated.value.city);
      localStorage.setItem('pincode',this.entitylocated.value.pincode);
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
