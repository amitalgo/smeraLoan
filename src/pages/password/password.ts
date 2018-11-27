import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { NameDesignationPage } from '../name-designation/name-designation';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  private submit: FormGroup;
  password: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.submit = this.formBuilder.group({
      password: ['', Validators.required],
    });

    this.password = this.submit.controls['password'];
  }

  doSubmit(){
    console.log('submit');
    this.navCtrl.setRoot(NameDesignationPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

}
