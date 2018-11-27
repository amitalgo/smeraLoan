import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { VerifyregisterPage } from '../verifyregister/verifyregister';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private register: FormGroup;
  email:AbstractControl;
  mobile:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.register = this.formBuilder.group({
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });

    this.email=this.register.controls['email'];
    this.mobile=this.register.controls['mobile'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister(){
    console.log('register');
    this.navCtrl.setRoot(VerifyregisterPage);
  }

}
