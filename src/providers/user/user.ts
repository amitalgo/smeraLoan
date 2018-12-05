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

}
