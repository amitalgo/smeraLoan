import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

// Pages
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public effect : any;
  public cssClass: string;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private nativePageTransitions: NativePageTransitions) {

    this.menuCtrl.enable(false, 'myMenu');    
  }

  applyClassBySelection(effect : string): void{
    this.cssClass = "animated" + effect;
  }

  register(){
      console.log("home");
    // let options: NativeTransitionOptions={
    //     direction: 'up',
    //     duration: 400,
    //     slowdownfactor: -1,
    //     iosdelay:50
    //   }
    //   this.nativePageTransitions.slide(options);
      this.navCtrl.setRoot(RegisterPage);
  }

}
