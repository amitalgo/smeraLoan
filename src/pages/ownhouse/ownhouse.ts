import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoanexistingPage } from '../loanexisting/loanexisting';

/**
 * Generated class for the OwnhousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ownhouse',
  templateUrl: 'ownhouse.html',
})
export class OwnhousePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnhousePage');
  }

  doHouse(){
    this.navCtrl.setRoot(LoanexistingPage);
  }

}
