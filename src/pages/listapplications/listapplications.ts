import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApplicationanswerPage } from '../applicationanswer/applicationanswer';

/**
 * Generated class for the ListapplicationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listapplications',
  templateUrl: 'listapplications.html',
})
export class ListapplicationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListapplicationsPage');
  }

  previewAnswer(){
    this.navCtrl.push(ApplicationanswerPage);
  }

}
