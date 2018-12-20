import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  forgotForm: FormGroup
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public sharedProvider:SharedProvider,public userProvider:UserProvider) {
    this.forgotForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    });
  }

  doSendMail(){
    this.sharedProvider.showLoader()
    this.userProvider.forgotPassword(this.forgotForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.forgotForm.reset()
      this.sharedProvider.presentToast(this.response.message)
      setTimeout(() => {
        this.navCtrl.setRoot(LoginPage);
    }, 2500);      
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

}
