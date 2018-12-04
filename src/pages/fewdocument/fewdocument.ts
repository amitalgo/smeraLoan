import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubmitdocumentPage } from '../submitdocument/submitdocument';
import { TermsPage } from '../terms/terms';

/**
 * Generated class for the FewdocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
    this.navCtrl.setRoot(SubmitdocumentPage);
  }

  doNotNow(){
    console.log("Not Now Submit Few Document");
    this.navCtrl.setRoot(TermsPage);
  }

}
