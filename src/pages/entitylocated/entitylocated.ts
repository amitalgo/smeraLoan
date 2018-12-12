import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { EntityactivityPage } from '../entityactivity/entityactivity';

/**
 * Generated class for the EntitylocatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entitylocated',
  templateUrl: 'entitylocated.html',
})
export class EntitylocatedPage {

  entitylocated: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.entitylocated = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntitylocatedPage');
  }

  doEntityLocated(){
    localStorage.setItem('address',this.entitylocated.value.address);
    localStorage.setItem('city',this.entitylocated.value.city);
    localStorage.setItem('pincode',this.entitylocated.value.pincode);
    this.navCtrl.setRoot(EntityactivityPage);
  }

}
