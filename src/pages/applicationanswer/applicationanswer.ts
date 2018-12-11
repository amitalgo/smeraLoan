import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { ListapplicationsPage } from '../listapplications/listapplications';
/**
 * Generated class for the ApplicationanswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-applicationanswer',
  templateUrl: 'applicationanswer.html',
})
export class ApplicationanswerPage {
  information: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http) {
    let localData = this.http.get('assets/information.json').map(res => res.json().items);
    localData.subscribe(data=>{
        this.information=data;
    });
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationanswerPage');
  }

  goBack(){
    this.navCtrl.push(ListapplicationsPage)
  }

}
