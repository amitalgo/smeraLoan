import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OwnhousePage } from '../ownhouse/ownhouse';

/**
 * Generated class for the PreferedbankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferedbank',
  templateUrl: 'preferedbank.html',
})
export class PreferedbankPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferedbankPage');
  }

  doProceed(){
    console.log("Prefered Bank");
    this.navCtrl.setRoot(OwnhousePage);
  }

}
