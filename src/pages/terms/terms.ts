import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThankyouPage } from '../thankyou/thankyou';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  terms: FormGroup;
  token : any;
  response : any;
  isenabled:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
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

  doContinue(){
    this.navCtrl.push(ThankyouPage);
  }

}
