import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';

import { ThatsnicePage } from '../thatsnice/thatsnice';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the CompanynamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-companyname',
  templateUrl: 'companyname.html',
})
export class CompanynamePage {

  private company: FormGroup;
  response: any;
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private userProvider:UserProvider,private sharedProvider:SharedProvider) {
    this.company = this.formBuilder.group({
      company_name: ['', Validators.required],
    });
  }

  doCompany(){
    this.sharedProvider.showLoader();
    this.token=localStorage.getItem('token');
    this.company.value['name']=localStorage.getItem('name');
    this.company.value['designation']=localStorage.getItem('designation');
    this.company.value['password']=localStorage.getItem('password');
    this.company.value['email']=localStorage.getItem('email');
    this.company.value['mobile']=localStorage.getItem('mobile');
    this.userProvider.updateUser(this.token,this.company.value).then(result => {
      this.sharedProvider.dismissLoader();
    this.response = result
    localStorage.setItem('company',this.company.value.company_name);
    this.navCtrl.push(ThatsnicePage);
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });





    // this.navCtrl.setRoot(ThatsnicePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanynamePage');
  }

}
