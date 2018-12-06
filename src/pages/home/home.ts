import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

// Pages
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public effect : any;
  public cssClass: string;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private nativePageTransitions: NativePageTransitions) {

    this.menuCtrl.enable(false, 'myMenu');    
    var i;
    console.log("local storage");
    for (i = 0; i < localStorage.length; i++)   {
        console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    }
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

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

}
