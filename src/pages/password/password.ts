import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { NameDesignationPage } from '../name-designation/name-designation';
import { PasswordValidationProvider } from '../../providers/password-validation/password-validation';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  private submit: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off'; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.submit = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([Validators.required])]
    },{
      validator: PasswordValidationProvider.MatchPassword
    });
  }

  doSubmit(){
    localStorage.setItem('password',this.submit.value.password);
    this.navCtrl.push(NameDesignationPage);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

}
