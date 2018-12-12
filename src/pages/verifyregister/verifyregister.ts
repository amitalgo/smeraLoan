import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PasswordPage } from '../password/password';
import { UserProvider } from '../../providers/user/user';
import { SharedProvider } from '../../providers/shared/shared';
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
  response: any;
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,private userProvider:UserProvider,private sharedProvider:SharedProvider,private event:Events) {
    this.verify = this.formBuilder.group({
      verification_code: ['', Validators.required],
    });
  }

  doVerify(){
    console.log('Enter verified');
    this.sharedProvider.showLoader();
    this.verify.value['email']=localStorage.getItem('email');
    this.userProvider.verifyotp(this.verify.value).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      if (typeof this.response.message === "undefined") {
        localStorage.setItem('token', this.response.token)
        localStorage.setItem('otp','true')
        this.fetchMemberProfile(this.response.token)
      } else {
        this.sharedProvider.presentToast(this.response.message);
      }
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something Went Wrong");
    });
  }

  fetchMemberProfile(token){
    this.token = token
    this.userProvider.detail(this.token).then(result=>{
      // this.sharedProvider.dismissLoader()
      this.response = result
      
      localStorage.setItem('memberId',this.response.member_id)
      localStorage.setItem('email', this.response.email)
      this.event.publish('user:updated',[])
      this.navCtrl.setRoot(PasswordPage)
    }).catch(err=>{
      // this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyregisterPage');
  }

}
