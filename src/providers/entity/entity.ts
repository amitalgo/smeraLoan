import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EntityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntityProvider {

  apiUrl= 'http://smera.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello EntityProvider Provider');
  }

  updateEntity(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=entity&action=update',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  getIndustry(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=entity&action=getindustry',{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

}
