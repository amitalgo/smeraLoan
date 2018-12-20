import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { EntitylocatedPage } from '../entitylocated/entitylocated';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { EntityProvider } from '../../providers/entity/entity';
/**
 * Generated class for the EntitytypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-entitytype',
  templateUrl: 'entitytype.html',
})
export class EntitytypePage {

  private entityType: FormGroup;
  response: any;
  token:any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private sharedProvider:SharedProvider,private loanApplicationProvider:LoanapplicationProvider,private entityProvider:EntityProvider) {
    this.entityType = this.formBuilder.group({
      entity_type: ['', Validators.required],
    });

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntitytypePage');
  }

  ionViewWillEnter () {
    if(this.lrId!=null && this.laId!=null && this.qcId!=null){
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        this.entityType.controls['entity_type'].setValue(this.response.type_of_organization)
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doEntityType(){
    localStorage.setItem('entityType',this.entityType.value.entity_type);
    this.navCtrl.push(EntitylocatedPage);
  }

  doUpdateEntityType(){
    console.log("Update Entity Type");
    this.sharedProvider.showLoader();

    var params= { "lrId":this.lrId,"laId":this.laId,"qcId":this.qcId,"entityType": this.entityType.value.entity_type}
    this.entityProvider.updateEntity(this.token,params).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('entityType',this.entityType.value.entity_type);
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

}
