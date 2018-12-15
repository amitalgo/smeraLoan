import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
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
import { VerifyregisterPage } from '../pages/verifyregister/verifyregister';
import { PasswordPage } from '../pages/password/password';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { StartoperationsPage } from '../pages/startoperations/startoperations';
import { EntityturnoverPage } from '../pages/entityturnover/entityturnover';
import { SubmitdocumentPage } from '../pages/submitdocument/submitdocument';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any =  HomePage

  pages: Array<{title: string, component: any}>;
  isLoggedIn: any;
  token:any;
  users:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public sharedService:SharedProvider,public sharedProvider: SharedProvider,public splashScreen: SplashScreen,private userProvider:UserProvider,public events: Events) {
    this.initializeApp();

    events.subscribe('user:updated',()=>{
      this.users = this.sharedService.getUserInfo()
    })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: HomePage },
      { title: 'Application Status', component: DashboardPage },
      { title: 'Notifications', component: ListPage },
      { title: 'Change Password', component: ChangepasswordPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isLoggedIn = this.sharedProvider.isLoggedIn();
      if(this.isLoggedIn=='otp'){
        this.nav.setRoot(PasswordPage)
      }else if(this.isLoggedIn){
        this.nav.setRoot(DashboardPage);
      }else{
        this.nav.setRoot(HomePage);
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
