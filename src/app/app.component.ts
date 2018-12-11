import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SharedProvider } from '../providers/shared/shared';
import { NameDesignationPage } from '../pages/name-designation/name-designation';
import { UserProvider } from '../providers/user/user';
import { ListapplicationsPage } from '../pages/listapplications/listapplications';
import { ApplicationanswerPage } from '../pages/applicationanswer/applicationanswer';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any =  HomePage

  pages: Array<{title: string, component: any}>;
  isLoggedIn: any;
  token:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public sharedProvider: SharedProvider,public splashScreen: SplashScreen,private userProvider:UserProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: HomePage },
      { title: 'Application Status', component: ListPage },
      { title: 'Banker Interests', component: ListPage },
      { title: 'Notifications', component: ListPage },
      { title: 'Change Password', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isLoggedIn = this.sharedProvider.isLoggedIn();
      if(this.isLoggedIn){
        this.nav.setRoot(NameDesignationPage);
      }
    });
  }

  doLogout(){
    this.sharedProvider.showLoader()
    this.token = localStorage.getItem('token')
    this.userProvider.logout(this.token).then(result=>{
      this.sharedProvider.clearLocalStorage()
      this.sharedProvider.dismissLoader()
      this.nav.setRoot(HomePage)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
    })

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
