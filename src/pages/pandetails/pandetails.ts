import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EntityturnoverPage } from '../entityturnover/entityturnover';


/**
 * Generated class for the PandetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pandetails',
  templateUrl: 'pandetails.html',
})
export class PandetailsPage {

  pandet: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.pandet = this.formBuilder.group({
      pan: ['', Validators.required],
      gst: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PandetailsPage');
  }

  doPanDet(){
    console.log("PAN Details");
    this.navCtrl.setRoot(EntityturnoverPage);
  }

}
