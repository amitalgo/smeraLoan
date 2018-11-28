import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { VerifyregisterPage } from '../pages/verifyregister/verifyregister';
import { PasswordPage } from '../pages/password/password';
import { NameDesignationPage } from '../pages/name-designation/name-designation';
import { CompanyNamePage } from '../pages/company-name/company-name';
import { MoreInfoPage } from '../pages/more-info/more-info';
import { LastAnswerPage } from '../pages/last-answer/last-answer';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    VerifyregisterPage,
    PasswordPage,
    NameDesignationPage,
    CompanyNamePage,
    MoreInfoPage,
    LastAnswerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    VerifyregisterPage,
    PasswordPage,
    NameDesignationPage,
    CompanyNamePage,
    MoreInfoPage,
    LastAnswerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFullScreen,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
