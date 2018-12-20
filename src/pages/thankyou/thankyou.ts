import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the ThankyouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

  name : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name=localStorage.getItem('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankyouPage');
  }

  doSubmit(){
    this.navCtrl.setRoot(DashboardPage);
  }

}
