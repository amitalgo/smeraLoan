import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SubmitdocumentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubmitdocumentProvider {

  apiUrl= 'http://smera.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello SubmitdocumentProvider Provider');
  }

  uploadDocument(data, token){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=uploadDocument&action=updoc', data, {
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

}
