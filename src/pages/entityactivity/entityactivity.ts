import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PandetailsPage } from '../pandetails/pandetails';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.entityactivity = this.formBuilder.group({
      activity: ['', Validators.required],
      industry: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityactivityPage');
  }

  doEntityActivity(){
    console.log("Entity Activity");
    this.navCtrl.setRoot(PandetailsPage);
  }

}
