import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SubmitdocumentPage } from '../submitdocument/submitdocument';
import { TermsPage } from '../terms/terms';

/**
 * Generated class for the FewdocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fewdocument',
  templateUrl: 'fewdocument.html',
})
export class FewdocumentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FewdocumentPage');
  }

  doProceed(){
    console.log("submit few documents");
    this.navCtrl.push(SubmitdocumentPage);
  }

  doNotNow(){
    console.log("Not Now Submit Few Document");
    this.navCtrl.push(TermsPage);
  }

}
