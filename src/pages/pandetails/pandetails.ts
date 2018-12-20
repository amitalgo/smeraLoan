import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EntityturnoverPage } from '../entityturnover/entityturnover';
import { SharedProvider } from '../../providers/shared/shared';
import { EntityProvider } from '../../providers/entity/entity';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';


/**
 * Generated class for the PandetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pandetails',
  templateUrl: 'pandetails.html',
})
export class PandetailsPage {

  pandet: FormGroup;
  token : any;
  response : any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private sharedProvider:SharedProvider,private entityProvider:EntityProvider,private loanApplicationProvider:LoanapplicationProvider) {
    this.pandet = this.formBuilder.group({
      pan: ['', Validators.compose([Validators.required,Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')])],
      gst: ['', Validators.compose([Validators.required,Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')])],
    });

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PandetailsPage');
  }

  ionViewWillEnter () {
    if(this.lrId!=null && this.laId!=null && this.qcId!=null){
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        this.pandet.controls['pan'].setValue(this.response.signatory_pan)
        this.pandet.controls['gst'].setValue(this.response.tan)
        // this.navCtrl.popToRoot({ animate: true, direction: 'back' }) 
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doPanDet(){
    this.sharedProvider.showLoader();
    this.pandet.value['yearOfEst']=localStorage.getItem('operationYear');
    this.pandet.value['entityType']=localStorage.getItem('entityType');
    this.pandet.value['address']=localStorage.getItem('address');
    this.pandet.value['city']=localStorage.getItem('city');
    this.pandet.value['pincode']=localStorage.getItem('pincode');
    this.pandet.value['activity']=localStorage.getItem('activity');
    this.pandet.value['industry']=localStorage.getItem('industry');

    this.entityProvider.updateEntity(this.token,this.pandet.value).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('pan',this.pandet.value.pan);
      localStorage.setItem('gst',this.pandet.value.gst);
      this.navCtrl.push(EntityturnoverPage);
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

  doUpdateDet(){
    console.log("Update Pan Function");
    this.sharedProvider.showLoader();
    this.pandet.value['lrId']=this.lrId;
    this.pandet.value['laId']=this.laId;
    this.pandet.value['qcId']=this.qcId;
    this.entityProvider.updateEntity(this.token,this.pandet.value).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('pan',this.pandet.value.pan);
      localStorage.setItem('gst',this.pandet.value.gst);
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

}
