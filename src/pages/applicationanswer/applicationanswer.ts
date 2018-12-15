import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { ListapplicationsPage } from '../listapplications/listapplications';
import { StartoperationsPage } from '../startoperations/startoperations';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,private menuCtrl:MenuController) {
    // let localData = this.http.get('assets/information.json').map(res => res.json().items);
    // localData.subscribe(data=>{
    //     this.information=data;
    // });
    this.information=navParams.get('questions');    
    console.log(this.information);
  }

  ionViewWillEnter () {
    this.menuCtrl.enable (true, "myMenu");
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  editQuestion(page,laId,qcId){
    console.log("Page is" +page);
    console.log('La Id is :' +laId);
    console.log('Qc Id is:' +qcId);

    this.navCtrl.push(page,{
        "laId":laId,
        "qcId":qcId
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationanswerPage');
  }

  goBack(){
    this.navCtrl.push(ListapplicationsPage)
  }

}
