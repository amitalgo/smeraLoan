import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PandetailsPage } from '../pandetails/pandetails';
import { EntityProvider } from '../../providers/entity/entity';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public entityProvider:EntityProvider) {
    this.entityactivity = this.formBuilder.group({
      activity: ['', Validators.required],
      industry: ['', Validators.required],
    });

    this.token=localStorage.getItem('token');
    this.getIndustry();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityactivityPage');
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

}
