import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FewdocumentPage } from '../fewdocument/fewdocument';
import { LoanapplicationProvider } from '../../providers/loanapplication/loanapplication';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the LoanexistingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loanexisting',
  templateUrl: 'loanexisting.html',
})
export class LoanexistingPage {

  existingloan: FormGroup;
  existingLoanData : any = [];
  token : any;
  response : any;
  public laId : any;
  public qcId : any;
  public lrId : any;
  index : any;
  action : any = 0;
  noExist : any = true;
  datas : any = [] ;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private loanApplicationProvider:LoanapplicationProvider,public sharedProvider:SharedProvider) {
    this.existingloan = this.formBuilder.group({
      loan_facility: [this.existingloan, Validators.required],
      loan_amount: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
      interest: ['', Validators.required],
      bank_name: ['', Validators.required],
    });

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.index=navParams.get('index')
    this.token=localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanexistingPage');
  }

  ionViewWillEnter () {
    if(this.lrId!=null && this.laId!=null && this.qcId!=null && this.index!=null){
      this.noExist=false
      this.sharedProvider.showLoader()
      this.loanApplicationProvider.getLoanApplicationById(this.token,{"lrId":this.lrId,"laId":this.laId,"qcId":this.qcId}).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response=result
        this.action=1
        var str = this.response.fund_based;
        var str2 = [];
        var editRec = [];
        if(str!=''){
          var a=str.split("|");
          a.forEach(function(value, index) {
            str2=value.split(",");
            editRec.push({'index':index,'bank_name' :str2[0],"interest":str2[3],"loan_facility":str2[4],"loan_amount":str2[2],"lrId":"","laId":"","qcId":""});
          });
          this.datas=editRec;
          // console.log(this.datas[0]);
          this.existingloan.controls['loan_facility'].setValue(this.datas[this.index].loan_facility)
          this.existingloan.controls['loan_amount'].setValue(this.datas[this.index].loan_amount)
          this.existingloan.controls['interest'].setValue(this.datas[this.index].interest)
          this.existingloan.controls['bank_name'].setValue(this.datas[this.index].bank_name)
        }

        // this.navCtrl.popToRoot({ animate: true, direction: 'back' }) 
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
        console.log('Inside Error');
        console.log(err);
      });
    }
  }

  doExistingLoan(){
    console.log("Loan Exisitng");
    this.sharedProvider.showLoader();
    this.existingLoanData.push(this.existingloan.value)
    this.loanApplicationProvider.updateExistingApplication(this.token,this.existingLoanData).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      if (this.response.message == "ok") {
        this.navCtrl.push(FewdocumentPage);
      } else {
        this.sharedProvider.presentToast(this.response.message);
      }
    }).catch(err => {
        console.log(err)
        this.sharedProvider.dismissLoader();
        this.sharedProvider.presentToast("Something went wrong")
    });
    
  }

  doUpdateExistingLoan(){
    this.datas[this.index].bank_name = this.existingloan.value.bank_name;
    this.datas[this.index].loan_facility = this.existingloan.value.loan_facility;
    this.datas[this.index].interest = this.existingloan.value.interest;
    this.datas[this.index].loan_amount = this.existingloan.value.loan_amount;
    
    var data = this.datas;
    // For Appending Where Condition IDs
    for (var obj in data) {
      data[obj].laId=this.laId;
      data[obj].lrId=this.lrId;
      data[obj].qcId=this.qcId;
    }

    // console.log(data);
    this.loanApplicationProvider.updateExistingApplication(this.token,data).then(result => {
      this.sharedProvider.dismissLoader();
      this.response = result
      if (this.response.message == "ok") {
        this.sharedProvider.presentToast('Data Updated');
        this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
      } else {
        this.sharedProvider.presentToast(this.response.message);
      }
    }).catch(err => {
        console.log(err)
        this.sharedProvider.dismissLoader();
        this.sharedProvider.presentToast("Something went wrong")
    });
    
  }

  doAddMore(){
    this.existingLoanData.push(this.existingloan.value)
    this.existingloan.reset()
  }

  EditField(){
    console.log('Edit Functionality');
  }

  noLoan(){
    console.log("No Existing Loan");
    // this.navCtrl.setRoot(FewdocumentPage);
  }

}
