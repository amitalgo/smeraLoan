import { Component } from '@angular/core';
import {  NavController, NavParams,MenuController } from 'ionic-angular';
import { ListapplicationsPage } from '../listapplications/listapplications';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController ) {
  }

  ionViewWillEnter () {
    this.menuCtrl.enable (true, "myMenu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  doListApplication(){
    this.navCtrl.setRoot(ListapplicationsPage)
  }

}
