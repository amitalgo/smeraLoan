import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SharedProvider } from '../providers/shared/shared';
import { UserProvider } from '../providers/user/user';
import { PasswordPage } from '../pages/password/password';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { ProfilePage } from '../pages/profile/profile';
import { VerifyregisterPage } from '../pages/verifyregister/verifyregister';
import { NameDesignationPage } from '../pages/name-designation/name-designation';
import { CompanynamePage } from '../pages/companyname/companyname';
import { StartoperationsPage } from '../pages/startoperations/startoperations';
import { EntitytypePage } from '../pages/entitytype/entitytype';
import { EntityactivityPage } from '../pages/entityactivity/entityactivity';
import { PandetailsPage } from '../pages/pandetails/pandetails';
import { EntityturnoverPage } from '../pages/entityturnover/entityturnover';
import { LoantermPage } from '../pages/loanterm/loanterm';
import { PreferedbankPage } from '../pages/preferedbank/preferedbank';
import { LoanexistingPage } from '../pages/loanexisting/loanexisting';
import { SubmitdocumentPage } from '../pages/submitdocument/submitdocument';
import { EntitylocatedPage } from '../pages/entitylocated/entitylocated';
import { TermsPage } from '../pages/terms/terms';

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
  tokenId:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public sharedService:SharedProvider,public sharedProvider: SharedProvider,public splashScreen: SplashScreen,private userProvider:UserProvider,public events: Events,private push: Push,private alertCtrl: AlertController) {
    this.initializeApp();

    events.subscribe('user:updated',()=>{
      this.users = this.sharedService.getUserInfo()
    })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: ProfilePage },
      { title: 'Application Status', component: DashboardPage },
      // { title: 'Notifications', component: ListPage },
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
        this.nav.setRoot(PasswordPage);
      }else if(this.isLoggedIn){
        this.nav.setRoot(EntityturnoverPage);
      }else{
        this.nav.setRoot(HomePage);
      }
      this.pushSetup();
    });
  }

  pushSetup(){

      // to initialize push notifications

      const options: PushOptions = {
      android: {
        senderID: '416800652818'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {}
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => {
        console.log('message -> ' + notification.message);
        //if user using app and push notification comes
        if (notification.additionalData.foreground) {
          // if application open, show popup
          // this.badge.increase(1)
    
          let confirmAlert = this.alertCtrl.create({
            title: notification.title,
            message: notification.message,
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                //TODO: Your logic here
                this.nav.push(DashboardPage);
              }
            }]
          });
          confirmAlert.present();
        } else {
          //if user NOT using app and push notification comes
          //TODO: Your logic on click of push notification directly
          this.nav.push(DashboardPage);
          console.log('Push notification clicked');
        }
       });
       
       pushObject.on('registration').subscribe((registration: any) => {
         let fcmresp = registration
         localStorage.setItem('tokenId',fcmresp.registrationId);
         console.log('LocalStorage is ' + localStorage.getItem('tokenId'));
       });
       
       pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error)); 
  }

  doLogout(){
    this.sharedProvider.showLoader()
    this.tokenId = localStorage.getItem('tokenId')
    this.token = localStorage.getItem('token')
    this.userProvider.logout(this.token).then(result=>{
      this.sharedProvider.clearLocalStorage()
      localStorage.setItem('tokenId', this.tokenId)
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
