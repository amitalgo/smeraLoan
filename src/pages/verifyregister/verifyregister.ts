import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PasswordPage } from '../password/password';
/**
 * Generated class for the VerifyregisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifyregister',
  templateUrl: 'verifyregister.html',
})
export class VerifyregisterPage {

  private verify: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.verify = this.formBuilder.group({
      otp: ['', Validators.required],
    });
  }

  doVerify(){
    console.log('verified');
    this.navCtrl.setRoot(PasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyregisterPage');
  }

}
