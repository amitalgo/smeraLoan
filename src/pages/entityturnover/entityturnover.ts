import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoanrequirementPage } from '../loanrequirement/loanrequirement';
import { SharedProvider } from '../../providers/shared/shared';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';

/**
 * Generated class for the EntityturnoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-entityturnover',
  templateUrl: 'entityturnover.html',
})
export class EntityturnoverPage {

  entityturnover: FormGroup;
  token : any;
  response : any;
  laId : any;
  qcId : any;
  lrId : any;
  action : any = 0;
  finYears :any;
  turnYear1 : any = [''];
  turnYear2 : any = [''];
  turnYear3 : any = [''];
  patYear1 : any = [''];
  patYear2 : any = [''];
  patYear3 : any = [''];
  turnData : any;
  patData : any;
  index : any;
  noExist : any = true;
  a : any = [];
  b:any =[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public sharedProvider:SharedProvider,public loanApplicationProvider:LoanapplicationProvider,) {
    this.entityturnover = this.formBuilder.group({
      turnOver: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
      turnoverYr: ['', Validators.required],
      pat: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
      pat_year: ['', Validators.required],
    });

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.index=navParams.get('index')
    this.token=localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityturnoverPage');
  }

  getFinancialYear(){
      this.loanApplicationProvider.allFinancialYears(this.token).then(result=>{
        this.finYears = result  
      }).catch(err=>{
        console.log('Inside Error');
        console.log(err);
      });
  }

  ionViewWillEnter () {
    this.getFinancialYear();
    if(this.lrId!=null && this.laId!=null && this.qcId!=null && this.index!=null){
      this.noExist=false
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        var str1= this.response.turn_over;
        var turn = [];
        var str2=this.response.pat
        if(str1!='' && str2!=''){
          this.a=str1.split(',');
          this.b=str2.split(',');
          this.entityturnover.controls['turnOver'].setValue(this.a[this.index])
          this.entityturnover.controls['turnoverYr'].setValue(this.index);
          this.entityturnover.controls['pat'].setValue(this.b[this.index])  
          this.entityturnover.controls['pat_year'].setValue(this.index)
        }        
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doEntityTurnover(){
    
    // For Setting TurnOver Value
    if(this.entityturnover.value.turnoverYr==0){
      this.turnYear1=[];
      this.turnYear1.push(this.entityturnover.value.turnOver);
    }else if(this.entityturnover.value.turnoverYr==1){
      this.turnYear2=[];
      this.turnYear2.push(this.entityturnover.value.turnOver);
    }else if(this.entityturnover.value.turnoverYr==2){
      this.turnYear3=[];
      this.turnYear3.push(this.entityturnover.value.turnOver);
    }

    // For Setting Pat Value
    if(this.entityturnover.value.pat_year==0){
      this.patYear1=[];
      this.patYear1.push(this.entityturnover.value.pat);
    }else if(this.entityturnover.value.pat_year==1){
      this.patYear2=[];
      this.patYear2.push(this.entityturnover.value.pat);
    }else if(this.entityturnover.value.pat_year==2){
      this.patYear3=[];
      this.patYear3.push(this.entityturnover.value.pat);
    }

    this.turnData = this.turnYear1.concat(this.turnYear2,this.turnYear3);
    this.patData = this.patYear1.concat(this.patYear2,this.patYear3);

    localStorage.setItem('salesTurnOver',this.entityturnover.value.turnOver);
    localStorage.setItem('salesTurnPat',this.entityturnover.value.pat);
    this.navCtrl.push(LoanrequirementPage);
  }

  doAddMore(){
    console.log('inside add more');
    // For Setting TurnOver Value
    if(this.entityturnover.value.turnoverYr==0){
      this.turnYear1=[];
      this.turnYear1.push(this.entityturnover.value.turnOver);
    }else if(this.entityturnover.value.turnoverYr==1){
      this.turnYear2=[];
      this.turnYear2.push(this.entityturnover.value.turnOver);
    }else if(this.entityturnover.value.turnoverYr==2){
      this.turnYear3=[];
      this.turnYear3.push(this.entityturnover.value.turnOver);
    }
    
    // For Setting Pat Value
    if(this.entityturnover.value.pat_year==0){
      this.patYear1=[];
      this.patYear1.push(this.entityturnover.value.pat);
    }else if(this.entityturnover.value.pat_year==1){
      this.patYear2=[];
      this.patYear2.push(this.entityturnover.value.pat);
    }else if(this.entityturnover.value.pat_year==2){
      this.patYear3=[];
      this.patYear3.push(this.entityturnover.value.pat);
    }
    
    this.entityturnover.reset()
  }

  doUpdateEntityTurnover(){
    console.log("Update Sales Turn Over Function");
    this.a[this.entityturnover.value.turnoverYr]=this.entityturnover.value.turnOver;
    this.b[this.entityturnover.value.pat_year]=this.entityturnover.value.pat;
    this.sharedProvider.showLoader();
    var params= { "lrId":this.lrId,"laId":this.laId,"qcId":this.qcId,"salesTurnOver": (this.a).toString(),"salesTurnPat":(this.b).toString()}
    this.loanApplicationProvider.updateLoanApplication(this.token,params).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      localStorage.setItem('salesTurnOver',this.a);
      localStorage.setItem('salesTurnPat',this.b);
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }).catch(err => {
      console.log(err)
      this.sharedProvider.dismissLoader();
      this.sharedProvider.presentToast("Something went wrong")
    });
  }

}
