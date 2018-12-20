import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileForm:FormGroup;
  token:any;
  userDetail:any;
  response:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private sharedProvider:SharedProvider,private userProvider : UserProvider) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      company_name: ['',Validators.required],
      mobile: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')])]
    })
    this.token = localStorage.getItem('token')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  doUpdateProfile(){
    this.sharedProvider.showLoader()
    this.profileForm.value['email']=localStorage.getItem('email');
    this.profileForm.value['password']=localStorage.getItem('password');
    this.userProvider.updateUser(this.token, this.profileForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  ionViewWillEnter(){
    this.sharedProvider.showLoader()
    this.userProvider.detail(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.userDetail = result
      this.profileForm.controls['name'].setValue(this.userDetail.fname+ ' ' + this.userDetail.lname)
      this.profileForm.controls['designation'].setValue(this.userDetail.designation)
      this.profileForm.controls['company_name'].setValue(this.userDetail.company_name)
      this.profileForm.controls['mobile'].setValue(this.userDetail.mobile)
      
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  goBack(){
    this.navCtrl.setRoot(DashboardPage);
  }

}
