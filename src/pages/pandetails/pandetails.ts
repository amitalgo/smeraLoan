import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
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
  pan : AbstractControl;
  gst:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.pandet = this.formBuilder.group({
      pan: ['', Validators.required],
      gst: ['', Validators.required],
    });

    this.pan = this.pandet.controls['pan'];
    this.gst = this.pandet.controls['gst'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PandetailsPage');
  }

  doPanDet(){
    console.log("PAN Details");
    this.navCtrl.setRoot(EntityturnoverPage);
  }

}
