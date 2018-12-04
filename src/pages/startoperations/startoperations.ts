import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { EntitytypePage } from '../entitytype/entitytype';

/**
 * Generated class for the StartoperationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startoperations',
  templateUrl: 'startoperations.html',
})
export class StartoperationsPage {

  private operations: FormGroup;
  year:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,) {
    this.operations = this.formBuilder.group({
      year:['',Validators.required]
    });  

    this.year = this.operations.controls['year'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartoperationsPage');
  }

  doOperations(){
    console.log("Operations");
    this.navCtrl.setRoot(EntitytypePage);
  }

}
