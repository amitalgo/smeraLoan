import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TermsPage } from '../terms/terms';

/**
 * Generated class for the SubmitdocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submitdocument',
  templateUrl: 'submitdocument.html',
})
export class SubmitdocumentPage {

  private submitdocuments: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.submitdocuments = this.formBuilder.group({
      identity_proof: ['', Validators.required],
      address_proof: ['', Validators.required],
      financial: ['', Validators.required],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitdocumentPage');
  }

  doSubmitDocuments(){
    console.log("Submit Documents");
    this.navCtrl.setRoot(TermsPage);
  }

}
