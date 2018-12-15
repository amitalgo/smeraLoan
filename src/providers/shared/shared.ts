import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  loading: any;
  member: any;
  token: any;
  otp:any;

  constructor(public http: HttpClient, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    console.log('Hello SharedProvider Provider');
  }

  getUserInfo() {
    this.member = {
      "memberId": localStorage.getItem('memberId'),
      "firstname": localStorage.getItem('firstname'),
      "lastname": localStorage.getItem('lastname'),
      "email": localStorage.getItem('email'),
      "companyName":localStorage.getItem('companyname'),
      "pan":localStorage.getItem("pan"),
      "designation":localStorage.getItem("designation"),
      "city":localStorage.getItem("city"),
      "salutation":localStorage.getItem("salutation")
    }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Processing..'
    });
    this.loading.present()
  }

  dismissLoader() {
    this.loading.dismiss();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    })

    toast.present();
  }

  public isLoggedIn() {
    this.token = localStorage.getItem('token')
    this.otp = localStorage.getItem('otp')
    if(this.otp){
      return 'otp';
    }else if(this.token){
      return true;
    }else{
      return false;
    }
  }

  public getToken(){
    return localStorage.getItem('token')
  }

  public clearLocalStorage() {
    localStorage.clear()
    return true
  }
}
