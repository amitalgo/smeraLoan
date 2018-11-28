import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private androidFullScreen: AndroidFullScreen, private nativePageTransitions: NativePageTransitions) {

    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));      
  }

  applyClassBySelection(effect : string): void{
    this.cssClass = "animated" + effect;
  }

  register(){
      console.log("clicked");
    let options: NativeTransitionOptions={
        direction: 'up',
        duration: 400,
        slowdownfactor: -1,
        iosdelay:50
      }
      this.nativePageTransitions.slide(options);
      this.navCtrl.setRoot(RegisterPage);
  }

}
