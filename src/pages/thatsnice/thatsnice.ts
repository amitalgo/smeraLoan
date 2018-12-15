import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LastAnswerPage } from '../last-answer/last-answer';

/**
 * Generated class for the ThatsnicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thatsnice',
  templateUrl: 'thatsnice.html',
})
export class ThatsnicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThatsnicePage');
  }

  doProceed(){
      this.navCtrl.push(LastAnswerPage);
  }

}
