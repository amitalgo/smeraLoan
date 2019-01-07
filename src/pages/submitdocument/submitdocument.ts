import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TermsPage } from '../terms/terms';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { DocumentPicker } from '@ionic-native/document-picker';
import { SharedProvider } from '../../providers/shared/shared';
import { FileChooser } from '@ionic-native/file-chooser';
import { File, FileEntry } from '@ionic-native/file';
import { SubmitdocumentProvider } from '../../providers/submitdocument/submitdocument';

/**
 * Generated class for the SubmitdocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-submitdocument',
  templateUrl: 'submitdocument.html',
})
export class SubmitdocumentPage {

  public uploadedFile: any;
  public documentType : string='';
  public response : any;
  public formValue : any;

  laId : any;
  qcId : any;
  lrId : any;
  token:any;

  public identityy:string;
  public addresss : string;
  public financiall : string;

  public typee :string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private formBuilder: FormBuilder,public file: File, public fileChooser: FileChooser,private platform: Platform, public filePicker: IOSFilePicker, public documentPicker: DocumentPicker,public sharedService: SharedProvider,public submitDocument:SubmitdocumentProvider) {

    this.laId=navParams.get('laId');    
    this.qcId=navParams.get('qcId');
    this.lrId=navParams.get('lrId');
    this.token=localStorage.getItem('token');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitdocumentPage');
  }

  doChooseDocuments(data,type){
    this.documentType=data.value;
    this.typee='';
    this.typee=type

    if(this.documentType==''){
      this.sharedService.presentToast('Please choose the option');
      return;
    }

    if(this.platform.is('ios')){
      this.documentPicker.getFile('all').then(uri=>{
        this.uploadedFile = uri
        console.log("Uploaded file "+this.uploadedFile)
        this.sharedService.showLoader()
        this.file.resolveLocalFilesystemUrl(uri).then(entry=>(<FileEntry>entry).file(file=>this.readFile(file))).catch(err=>{
          console.log("Error in file reader "+err)
          this.sharedService.dismissLoader()
          // this.dismiss().
        })
      }).catch(err => {
        console.log('Error occured in file picker '+ JSON.stringify(err))
        // this.dismiss()
      });
    }else{
      this.fileChooser.open().then(uri=>{
        this.uploadedFile = uri
        console.log("Uploaded file for android "+this.uploadedFile)
        this.sharedService.showLoader()
        this.file.resolveLocalFilesystemUrl(uri).then(entry=>(<FileEntry>entry).file(file=>this.readFile(file))).catch(err=>{
          console.log("Error in file reader "+err)
          this.sharedService.dismissLoader()
          // this.dismiss()
        })
      }).catch(err=>{
        console.log("Error occured during file chooser "+JSON.stringify(err))
        // this.dismiss()
      })  
    }

    // this.navCtrl.setRoot(TermsPage);
  }

  readFile(file){
    console.log("Inside read file")
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const fileBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', fileBlob, file.name);
      formData.append('documentType',this.documentType);
      this.formValue=formData;
      if(this.typee=='iden'){
        this.identityy=this.typee
      }else if(this.typee=='add'){
        this.addresss=this.typee
      }else if(this.typee='fin'){
        this.financiall=this.typee
      }
      this.sharedService.dismissLoader()
    };
    reader.readAsArrayBuffer(file);
  }

  doUploadDocuments(){
    if(this.documentType==''){
      this.sharedService.presentToast('Please choose the a file before uploading');
      return;
    }
    console.log("Upload Ready");
    this.sharedService.showLoader()
    this.submitDocument.uploadDocument(this.formValue, this.sharedService.getToken()).then(result=>{
      this.response=result
      this.sharedService.dismissLoader()
      this.sharedService.presentToast(JSON.stringify(this.response.message))
      console.log('Response is'+JSON.stringify(result));
      this.documentType='';
      this.dismiss()
    },(err)=>{    
      console.log("Error occured "+JSON.stringify(err))    
      this.sharedService.dismissLoader()
      this.sharedService.presentToast("Something went wrong!");
      this.dismiss()
    })
  }

  doProceed(){
    if(this.lrId!=null && this.laId!=null && this.qcId!=null){
      this.navCtrl.popToRoot({ animate: true, direction: 'back',duration: 500  }) 
    }else{
      this.navCtrl.push(TermsPage);
    }
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  uploadDocument(){

  }

}
