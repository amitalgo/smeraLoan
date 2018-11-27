import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

/**
 * Generated class for the NameDesignationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-name-designation',
  templateUrl: 'name-designation.html',
})
export class NameDesignationPage {

  private namedes: FormGroup;
  name: AbstractControl;
  designation: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.namedes = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
    });

    this.name = this.namedes.controls['name'];
    this.designation = this.namedes.controls['designation'];
  }

  doNameDes(){
    console.log('Name Submit');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NameDesignationPage');
  }

}
