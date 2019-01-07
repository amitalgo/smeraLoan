import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
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

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private register: FormGroup;
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,private viewCtrl:ViewController,private sharedProvider:SharedProvider,private userProvider: UserProvider) {
    this.register = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.pattern('^[a-z0-9_.+-]+@[a-z0-9-]+.[a-z0-9-.]+$')])],
      mobile: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister(){
    console.log('register');
    this.sharedProvider.showLoader()
    this.register.value['employee_rights']=0
    this.register.value['status']="pending"

    this.userProvider.register(this.register.value).then(result => {
      this.sharedProvider.dismissLoader()
      this.response = result
      if (this.response.message == "ok") {
        localStorage.setItem('email',this.register.value.email)
        localStorage.setItem('mobile',this.register.value.mobile)
        this.navCtrl.push(VerifyregisterPage);
      } else {
        this.sharedProvider.presentToast(this.response.message);
      }
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader()
    });    
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
