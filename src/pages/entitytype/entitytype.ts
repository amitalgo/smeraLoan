import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
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

  private entityType: FormGroup;
  response: any;
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {
    this.entityType = this.formBuilder.group({
      entity_type: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntitytypePage');
  }

  doEntityType(){
    localStorage.setItem('entityType',this.entityType.value.entity_type);
    this.navCtrl.push(EntitylocatedPage);
  }

  doUpdateEntityType(){

  }

}
