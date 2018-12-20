import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StartoperationsPage } from '../startoperations/startoperations';

/**
 * Generated class for the LastAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-last-answer',
  templateUrl: 'last-answer.html',
})
export class LastAnswerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LastAnswerPage');
  }

  doLastAnswer(){
    this.navCtrl.push(StartoperationsPage);
  }

}
