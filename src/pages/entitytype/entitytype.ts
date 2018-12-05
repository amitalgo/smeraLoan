import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EntitylocatedPage } from '../entitylocated/entitylocated';
/**
 * Generated class for the EntitytypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entitytype',
  templateUrl: 'entitytype.html',
})
export class EntitytypePage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntitytypePage');
  }

  doEntityType(val){
    console.log("Entity Type");
    console.log(val);
    this.navCtrl.setRoot(EntitylocatedPage);
  }

}
