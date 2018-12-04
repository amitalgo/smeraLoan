import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
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
  pan : AbstractControl;
  pan_year:AbstractControl;
  pat:AbstractControl;
  pat_year:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.entityturnover = this.formBuilder.group({
      pan: ['', Validators.required],
      pan_year: ['', Validators.required],
      pat: ['', Validators.required],
      pat_year: ['', Validators.required],
    });

    this.pan = this.entityturnover.controls['pan'];
    this.pan_year = this.entityturnover.controls['pan_year'];
    this.pat = this.entityturnover.controls['pat'];
    this.pat_year = this.entityturnover.controls['pat_year'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityturnoverPage');
  }

  doEntityTurnover(){
    console.log("Entity Turnover");
    this.navCtrl.setRoot(LoanrequirementPage);
  }

}
