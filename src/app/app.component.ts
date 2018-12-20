import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
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

  constructor(public platform: Platform, public statusBar: StatusBar, public sharedService:SharedProvider,public sharedProvider: SharedProvider,public splashScreen: SplashScreen,private userProvider:UserProvider,public events: Events,private push: Push) {
    this.initializeApp();

    events.subscribe('user:updated',()=>{
      this.users = this.sharedService.getUserInfo()
    })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: ProfilePage },
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
        this.nav.setRoot(PasswordPage);
      }else if(this.isLoggedIn){
        this.nav.setRoot(DashboardPage);
      }else{
        this.nav.setRoot(HomePage);
      }

      this.pushSetup();
    });
  }

  pushSetup(){
    // to check if we have permission
      this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

      // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
      this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
      }).then(() => console.log('Channel created'));

      // Delete a channel (Android O and above)
      this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

      // Return a list of currently configured channels
      this.push.listChannels().then((channels) => console.log('List of channels', channels))

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
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
      };

      const pushObject: PushObject = this.push.init(options);


      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

      pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
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
