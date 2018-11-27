import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

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
  otp: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.verify = this.formBuilder.group({
      otp: ['', Validators.required],
    });

    this.otp = this.verify.controls['otp'];
  }

  doVerify(){
    console.log('verified');
    this.navCtrl.setRoot(PasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyregisterPage');
  }

}
