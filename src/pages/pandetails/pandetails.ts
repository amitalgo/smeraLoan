import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EntityturnoverPage } from '../entityturnover/entityturnover';
import { SharedProvider } from '../../providers/shared/shared';
import { EntityProvider } from '../../providers/entity/entity';


/**
 * Generated class for the PandetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pandetails',
  templateUrl: 'pandetails.html',
})
export class PandetailsPage {

  pandet: FormGroup;
  token : any;
  response : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private sharedProvider:SharedProvider,private entityProvider:EntityProvider) {
    this.pandet = this.formBuilder.group({
      pan: ['', Validators.required],
      gst: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PandetailsPage');
  }

  doPanDet(){
    this.sharedProvider.showLoader();
    this.token=localStorage.getItem('token');
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

}
