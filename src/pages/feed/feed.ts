import { Component } from '@angular/core';
import { NavController, ModalController, ModalOptions, AlertController } from 'ionic-angular';
import { CameramodalPage } from '../cameramodal/cameramodal';
import { HttpHeaders } from '@angular/common/http';
import { Api } from '../../providers/api/api';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {
  private feedItems: any = [];
	private feedPage: any = 1;

  constructor(public navCtrl: NavController,
      public modalCtrl: ModalController,
      public alertCtrl: AlertController,
      private api: Api,
      private sessionProvider: SessionProvider
      ) {
    this.feedPage = 1;
    this.loadFeedItem();
  }

  openModal() {
    let myModalOption: ModalOptions = {
      enableBackdropDismiss: false
    };
    let myModal = this.modalCtrl.create(CameramodalPage, {data: {}}, myModalOption);
    myModal.present();
  }

  loadFeedItem(){
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    // var endURL = "feeds/1441063662635886/1";
    var endURL = "feeds/"+this.sessionProvider.userData.faceId+"/1";
    this.api.get(endURL, { headers: headers, observe: 'response' }).subscribe((res: any) => {
      this.feedItems = res.posts;
    }, error => { 
        this.simpleAlert('Erro', '', 'Não foi possível estabelecer uma conexão com o servidor. Verifique sua conexão.');
    });
  }

  doRefresh(refresher) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    // var endURL = "feeds/1441063662635886/1";
    var endURL = "feeds/"+this.sessionProvider.userData.faceId+"/1";
    this.api.get(endURL, { headers: headers, observe: 'response' }).subscribe((res: any) => {
      this.feedItems = res.posts;
      refresher.complete();
    }, error => { 
        this.simpleAlert('Erro', '', 'Não foi possível estabelecer uma conexão com o servidor. Verifique sua conexão.');
        refresher.complete();

    });
  }

  doInfinite(event) {
    return new Promise((resolve) => {
      this.feedPage = this.feedPage+1;
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
        // var endURL = "feeds/1441063662635886/"+this.feedPage;
        var endURL = "feeds/"+this.sessionProvider.userData.faceId+"/"+this.feedPage;
        this.api.get(endURL, { headers: headers, observe: 'response' }).subscribe((res: any) => {
        this.feedItems.push(...res.posts);
        resolve();
      }, error => { 
          this.simpleAlert('Erro', '', 'Não foi possível estabelecer uma conexão com o servidor. Verifique sua conexão.');
          resolve();
      });
    })
    
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
