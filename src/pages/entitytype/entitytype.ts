import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { EntitylocatedPage } from '../entitylocated/entitylocated';
/**
 * Generated class for the EntitytypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entitytype',
  templateUrl: 'entitytype.html',
})
export class EntitytypePage {

  entitytype: FormGroup;
  public_limited : AbstractControl;
  llp:AbstractControl;
  parternership:AbstractControl;
  huf:AbstractControl;
  private_limited:AbstractControl;
  sale_proprietorship:AbstractControl;
  society:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.entitytype = this.formBuilder.group({
      public_limited: ['', Validators.required],
      llp: ['', Validators.required],
      parternership: ['', Validators.required],
      huf: ['', Validators.required],
      private_limited: ['', Validators.required],
      sale_proprietorship: ['', Validators.required],
      society: ['', Validators.required],
    });

    this.public_limited = this.entitytype.controls['public_limited'];
    this.llp = this.entitytype.controls['llp'];
    this.parternership = this.entitytype.controls['parternership'];
    this.huf = this.entitytype.controls['huf'];
    this.private_limited = this.entitytype.controls['private_limited'];
    this.sale_proprietorship = this.entitytype.controls['sale_proprietorship'];
    this.society = this.entitytype.controls['society'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntitytypePage');
  }

  doEntityType(){
    console.log("Entity Type");
    this.navCtrl.setRoot(EntitylocatedPage);
  }

}
