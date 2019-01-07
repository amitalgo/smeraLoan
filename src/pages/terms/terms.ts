import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ThankyouPage } from '../thankyou/thankyou';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  terms: FormGroup;
  token : any;
  response : any;
  isenabled:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private inAppBrowser:InAppBrowser) {
    this.terms = this.formBuilder.group({
      termVal: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }

  datachanged(e:any){
    if(e.checked){
      this.isenabled=true; 
    }else{
      this.isenabled=false; 
    }
  }

  redirect(){
    this.inAppBrowser.create("https://www.smeraonline.com/privacy-policy.php/");
  }

  doContinue(){
    this.navCtrl.push(ThankyouPage);
  }

}
