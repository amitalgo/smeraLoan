import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  apiUrl= 'http://smera.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  register(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=register',JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json')     
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  autheticate(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=login',JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json')     
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

  detail(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=user&action=profile',{
        headers: new HttpHeaders().set('Access-Control-Allow-Origin','*').set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }

  verifyotp(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=otpver',JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json')     
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

  logout(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=user&action=logout',{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }

}
