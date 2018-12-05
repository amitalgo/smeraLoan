import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoanrequirementPage } from '../loanrequirement/loanrequirement';

/**
 * Generated class for the EntityturnoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entityturnover',
  templateUrl: 'entityturnover.html',
})
export class EntityturnoverPage {

  entityturnover: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.entityturnover = this.formBuilder.group({
      pan: ['', Validators.required],
      pan_year: ['', Validators.required],
      pat: ['', Validators.required],
      pat_year: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityturnoverPage');
  }

  doEntityTurnover(){
    console.log("Entity Turnover");
    this.navCtrl.setRoot(LoanrequirementPage);
  }

}
