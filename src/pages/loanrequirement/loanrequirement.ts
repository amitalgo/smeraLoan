import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoantermPage } from '../loanterm/loanterm';

/**
 * Generated class for the LoanrequirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loanrequirement',
  templateUrl: 'loanrequirement.html',
})
export class LoanrequirementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanrequirementPage');
  }

  doProceed(){
    console.log('loan requirements');
    this.navCtrl.setRoot(LoantermPage);
  }

}
