import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { EntitytypePage } from '../entitytype/entitytype';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { EntityProvider } from '../../providers/entity/entity';

/**
 * Generated class for the StartoperationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startoperations',
  templateUrl: 'startoperations.html',
})
export class StartoperationsPage {

  private operations: FormGroup;
  public data : any;
  token : any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sharedProvider:SharedProvider,private loanApplicationProvider:LoanapplicationProvider,private formBuilder: FormBuilder,private entityProvider:EntityProvider) {
    this.operations = this.formBuilder.group({
      year:['',Validators.required]
    });  
    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartoperationsPage');
  }

  ionViewWillEnter () {
    if(this.lrId!='' && this.laId!='' && this.qcId!=''){
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.data=result
        this.action=1
        this.operations.controls['year'].setValue(this.data.year_of_incorporation)
        // this.navCtrl.popToRoot({ animate: true, direction: 'back' }) 
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doOperations(){
    console.log("Operations");
    localStorage.setItem('operationYear',this.operations.value.year);
    this.navCtrl.push(EntitytypePage);
  }

  doUpdateOperations(){
    console.log("Update Year of operations Function");
    this.sharedProvider.showLoader();
    this.operations.value['lrId']=this.lrId;
    this.operations.value['laId']=this.laId;
    this.operations.value['qcId']=this.qcId;
    this.operations.value['yearOfEst']=this.operations.value.year;
    
    this.entityProvider.updateEntity(this.token,this.operations.value).then(result => {
      this.sharedProvider.dismissLoader();
      this.data = result
      localStorage.setItem('operationYear',this.operations.value.year);
      this.sharedProvider.presentToast(this.data.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

}
