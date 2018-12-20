import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CompanynamePage } from '../companyname/companyname';
/**
 * Generated class for the NameDesignationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-name-designation',
  templateUrl: 'name-designation.html',
})
export class NameDesignationPage {

  private namedes: FormGroup;

  constructor(public navCtrl: NavController, private menuCtrl:MenuController ,public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.namedes = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
    });
  }

  ionViewWillEnter () {
    this.menuCtrl.enable (true, "myMenu");
  }

  doNameDes(){
    localStorage.setItem('name',this.namedes.value.name);
    localStorage.setItem('designation',this.namedes.value.designation);
    this.navCtrl.push(CompanynamePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NameDesignationPage');
  }

}
