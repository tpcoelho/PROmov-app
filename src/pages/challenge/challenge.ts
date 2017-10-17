import { Component } from '@angular/core';
import { NavController, ModalController, ModalOptions, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CameramodalPage } from '../cameramodal/cameramodal';
import { HttpHeaders } from '@angular/common/http';
import { Api } from '../../providers/api/api';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'page-challenge',
  templateUrl: 'challenge.html'
})
export class ChallengePage {

  private desafioItems:any =[];
  itemAtual:any ={
      "_id" : "",
      "type" : "",
      "brand" : "",
      "supermarket" : "",
      "store" : "",
      "longitude" : "",
      "latitude" : "",
      "comments" : [],
      "likes" : [],
      "photos" : [ 
          {"Photo": ''}
      ]
  };

  itemDefault:any ={
      "_id" : "",
      "type" : "",
      "brand" : "",
      "supermarket" : "",
      "store" : "",
      "longitude" : "",
      "latitude" : "",
      "comments" : [],
      "likes" : [],
      "photos" : [ 
          {"Photo": ''}
      ]
  };
  indexItem:any = 0;

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public translateService: TranslateService,
    private api: Api,
    private sessionProvider: SessionProvider
    ) {

    this.loadDesafioItems();
  }

  openModal() {
    let myModalOption: ModalOptions = {
      enableBackdropDismiss: false
    };
    let myModal = this.modalCtrl.create(CameramodalPage, {data: {}}, myModalOption);
    myModal.present();
  }

  loadDesafioItems(){
    this.indexItem = 0;
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    // var endURL = "challenge/1441063662635886";
    var endURL = "challenge/"+this.sessionProvider.userData.faceId;
    this.api.get(endURL, { headers: headers, observe: 'response' }).subscribe((res: any) => {
          this.desafioItems = res.posts;
          if(res.posts.length > 0){
            this.itemAtual = this.desafioItems[0];
          }else{
            this.itemAtual = this.itemDefault;
          }
      }, error => { 
          console.log(error);
          // this.simpleAlert('Erro', '', 'Não foi possível estabelecer uma conexão com o servidor. Verifique sua conexão.');
      });
  }

  like(){
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    var salvaPost = {
      // "faceId": "1441063662635886",
      "faceId": this.sessionProvider.userData.faceId,
      "postId": this.itemAtual._id
    }
    this.api.post("post/addLike", salvaPost, { headers: headers, observe: 'response' }).subscribe((res: any) => {
      this.trocaItem();
    }, error => { 
        console.log(error);
    });
  }

  next(){
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    var salvaPost = {
      // "faceId": "1441063662635886",
      "faceId": this.sessionProvider.userData.faceId,
      "postId": this.itemAtual._id
    }
    this.api.post("post/addDislike", salvaPost, { headers: headers, observe: 'response' }).subscribe((res: any) => {
      this.trocaItem();
    }, error => { 
        console.log(error);
    });
  }

  trocaItem(){
    this.indexItem = this.indexItem+1;
    if(this.indexItem < this.desafioItems.length){
      this.itemAtual = this.desafioItems[this.indexItem];
    }else{
      this.loadDesafioItems();
    }
  }
  simpleAlert(msgt, msgs, msg){
    var alert = this.alertCtrl.create({
      title: msgt,
      subTitle: msgs,
      message: msg,
      buttons: [{ text: 'Ok' }]
    });
    alert.present();
  }
}
