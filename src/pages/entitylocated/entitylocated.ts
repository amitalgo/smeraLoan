import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

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
  address : AbstractControl;
  city:AbstractControl;
  pincode:AbstractControl;

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
    console.log("Entity Located");
    this.navCtrl.setRoot(EntityactivityPage);
  }

}