import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidationProvider } from '../../providers/password-validation/password-validation';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  private changePassword;
  token : any;
  response : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,public userProvider:UserProvider,public sharedProvider:SharedProvider,private formBuilder: FormBuilder) {
    this.changePassword = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([Validators.required])]
    },{
      validator: PasswordValidationProvider.MatchPassword
    })
    this.token = localStorage.getItem('token')
  }

  ionViewWillEnter () {
    this.menuCtrl.enable (true, "myMenu");
  }

  doUpdatePassword(){
    this.sharedProvider.showLoader()
    this.userProvider.updatePassword(this.token, this.changePassword.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      localStorage.setItem('password',this.changePassword.value.password);
      this.changePassword.reset()
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
