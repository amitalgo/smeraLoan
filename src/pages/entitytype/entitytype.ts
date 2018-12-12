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

  doEntityType(enType){
    localStorage.setItem('entityType',enType);
    this.navCtrl.push(EntitylocatedPage);
  }

}
