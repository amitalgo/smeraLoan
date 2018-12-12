import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { DocumentPicker } from '@ionic-native/document-picker';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { VerifyregisterPage } from '../pages/verifyregister/verifyregister';
import { PasswordPage } from '../pages/password/password';
import { NameDesignationPage } from '../pages/name-designation/name-designation';
import { MoreInfoPage } from '../pages/more-info/more-info';
import { LastAnswerPage } from '../pages/last-answer/last-answer';
import { CompanynamePage } from '../pages/companyname/companyname';
import { ThatsnicePage } from '../pages/thatsnice/thatsnice';
import { EntitytypePage } from '../pages/entitytype/entitytype';
import { LoanrequirementPage } from '../pages/loanrequirement/loanrequirement';
import { StartoperationsPage } from '../pages/startoperations/startoperations';
import { EntitylocatedPage } from '../pages/entitylocated/entitylocated';
import { EntityactivityPage } from '../pages/entityactivity/entityactivity';
import { PandetailsPage } from '../pages/pandetails/pandetails';
import { EntityturnoverPage } from '../pages/entityturnover/entityturnover';
import { LoantermPage } from '../pages/loanterm/loanterm';
import { PreferedbankPage } from '../pages/preferedbank/preferedbank';
import { OwnhousePage } from '../pages/ownhouse/ownhouse';
import { LoanexistingPage } from '../pages/loanexisting/loanexisting';
import { FewdocumentPage } from '../pages/fewdocument/fewdocument';
import { SubmitdocumentPage } from '../pages/submitdocument/submitdocument';
import { TermsPage } from '../pages/terms/terms';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { UserProvider } from '../providers/user/user';
import { SharedProvider } from '../providers/shared/shared';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ListapplicationsPage } from '../pages/listapplications/listapplications';
import { ApplicationanswerPage } from '../pages/applicationanswer/applicationanswer';

import { HttpModule } from '@angular/http';
import { EntityProvider } from '../providers/entity/entity';
import { LoanapplicationProvider } from '../providers/loanapplication/loanapplication';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    VerifyregisterPage,
    PasswordPage,
    NameDesignationPage,
    MoreInfoPage,
    LastAnswerPage,
    CompanynamePage,
    ThatsnicePage,
    EntitytypePage,
    LoanrequirementPage,
    LoantermPage,
    LoanexistingPage,
    StartoperationsPage,
    EntitylocatedPage,
    EntityactivityPage,
    PandetailsPage,
    EntityturnoverPage,
    PreferedbankPage,
    OwnhousePage,
    FewdocumentPage,
    SubmitdocumentPage,
    TermsPage,
    ThankyouPage,
    LoginPage,
    DashboardPage,
    ListapplicationsPage,
    ApplicationanswerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
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
    MoreInfoPage,
    LastAnswerPage,
    CompanynamePage,
    ThatsnicePage,
    EntitytypePage,
    LoanrequirementPage,
    LoantermPage,
    LoanexistingPage,
    StartoperationsPage,
    EntitylocatedPage,
    EntityactivityPage,
    PandetailsPage,
    EntityturnoverPage,
    PreferedbankPage,
    OwnhousePage,
    FewdocumentPage,
    SubmitdocumentPage,
    TermsPage,
    ThankyouPage,
    LoginPage,
    DashboardPage,
    ListapplicationsPage,
    ApplicationanswerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFullScreen,
    NativePageTransitions,
    File,
    FileChooser,
    IOSFilePicker,
    DocumentPicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    SharedProvider,
    EntityProvider,
    LoanapplicationProvider
  ]
})
export class AppModule {}
