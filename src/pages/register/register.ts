import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { VerifyregisterPage } from '../verifyregister/verifyregister';
import { UserProvider } from '../../providers/user/user';
import { SharedProvider } from '../../providers/shared/shared';
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
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,private viewCtrl:ViewController,private sharedProvider:SharedProvider,private userProvider: UserProvider) {
    this.register = this.formBuilder.group({
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister(){
    console.log('register');
    this.register.value['employee_rights']=0
    this.register.value['status']="pending"

    this.userProvider.register(this.register.value).then(result => {
      // this.sharedProvider.dismissLoader()
      this.response = result
      this.navCtrl.setRoot(VerifyregisterPage);
    }).catch(err => {
      console.log(err)
      // this.sharedProvider.dismissLoader()
    });    
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
