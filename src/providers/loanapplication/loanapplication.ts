import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoanapplicationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoanapplicationProvider {

  apiUrl= 'http://smera.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello LoanapplicationProvider Provider');
  }

  updateLoanApplication(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=loanApplication&action=update',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  allApplication(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=loanApplication&action=getall',{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  getQuestionariesAnswer(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=loanApplication&action=getquestionariesanswer',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  getLoanApplicationById(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=loanApplication&action=getloanapplicationbyid',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  addNewApplication(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=loanApplication&action=add',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  updateExistingApplication(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=loanApplication&action=updateexistingloan',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  allFinancialYears(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=loanApplication&action=getfinancialyr',{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

}
