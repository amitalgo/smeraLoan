import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CompanynamePage } from '../companyname/companyname';
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

  constructor(public navCtrl: NavController, private menuCtrl:MenuController ,public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.namedes = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
    });

    this.name = this.namedes.controls['name'];
    this.designation = this.namedes.controls['designation'];
  }

  ionViewWillEnter () {
    this.menuCtrl.enable (true, "myMenu");
  }

  doNameDes(){
    console.log('Name Submit');
    this.navCtrl.setRoot(CompanynamePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NameDesignationPage');
  }

}
