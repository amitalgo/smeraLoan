import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

// Pages
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private androidFullScreen: AndroidFullScreen) {

    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));      
  }

  register(){
      console.log("clicked");
      this.navCtrl.setRoot(RegisterPage);
  }

}
