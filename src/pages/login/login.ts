import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';
import { NameDesignationPage } from '../name-designation/name-designation';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private login: FormGroup;
  loginResponse: any;
  token:any;
  memberResponse:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private sharedProvider:SharedProvider,private userProvider: UserProvider,private event: Events) {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin(){
    this.sharedProvider.showLoader()
    this.userProvider.autheticate(this.login.value).then(result => {
      // this.sharedProvider.dismissLoader()
      this.loginResponse = result
      localStorage.setItem('token', this.loginResponse.token)
      this.fetchMemberProfile(this.loginResponse.token)
    }).catch(err => {
      this.sharedProvider.dismissLoader()
      console.log(JSON.stringify(err))
    });  
  }

  fetchMemberProfile(token){
    this.token = token
    this.userProvider.detail(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.memberResponse = result
      localStorage.setItem('memberId',this.memberResponse.member_id)
      localStorage.setItem('fName', this.memberResponse.fname)
      localStorage.setItem('lname',this.memberResponse.lname)
      localStorage.setItem('email', this.memberResponse.email)
      localStorage.setItem('company_name', this.memberResponse.company_name)
      localStorage.setItem('designation',this.memberResponse.designation)
      this.event.publish('user:updated',[])
      this.navCtrl.setRoot(NameDesignationPage)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
