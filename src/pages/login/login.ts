import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpHeaders } from '@angular/common/http';

import { FeedPage } from '../feed/feed';
import { SessionProvider } from '../../providers/session/session';
import { LocalDb } from '../../providers/local-db/local-db';
import { Api } from '../../providers/api/api';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
      public alertCtrl: AlertController,
      public translateService: TranslateService,
      public event: Events,
      private facebook: Facebook,
      private LocalDb: LocalDb,
      private api: Api,
      private loadingCtrl: LoadingController,
      private SessionProvider: SessionProvider
    ) {

      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      })
  }

  loginFacebook() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loadingPopup.present();
    //Garante que o usaurio esteja deslogado antes de logar
    this.logoutFacebook();
  
    let permissions = ["public_profile", "user_birthday"];
    this.facebook.login(permissions).then((res: FacebookLoginResponse) => {
      // console.log('Logged into Facebook!', res);
      let params = new Array();
      this.facebook.api("/me?fields=id,name,gender,birthday,picture.type(large)", params).then(user => {

        user.facebooktoken = res.authResponse.accessToken;
        user.facebookexpiresin = res.authResponse.expiresIn;

        //Persiste os dados no banco
        this.signupFacebook(user).then(data => {
          //Se gravou os dados, direciona para homepage
          if(data == true) {

            this.navCtrl.setRoot(FeedPage);
            loadingPopup.dismiss();
          }
        }, err => {
          this.simpleAlert('Erro', '', 'Erro ao persistir os dados no banco!');
          loadingPopup.dismiss();
        });

      }, error => {
        this.simpleAlert('Erro', '', 'Erro buscar dados no Facebook!');
        loadingPopup.dismiss();
      });
    }).catch((e) => {
      this.simpleAlert('Erro', '', 'Error logging into Facebook!');
      loadingPopup.dismiss();
      console.log('Error logging into Facebook', e)
    });
  }

  logoutFacebook(){
    this.facebook.logout().then(response => {
        console.log(response);
      }, error => {
        console.log(error);
    });
  }

  /*
   * Tenta cadastrar um novo usuário.
   */
  signupFacebook(user) {
    return new Promise(resolve => {
      //Trata o campo aniversario
      if (!user.birthday) {
        user.birthday = '';
      }
      var newUser = {  
        "faceId": user.id,
        "name": user.name,
        "sexo": user.gender,
        "photo": user.picture.data.url
        // "birth": user.birthday,
        // "fbToken": user.facebooktoken,
        // "fbExpire": user.facebookexpiresin
      }
      var headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.api.post("user", newUser, { headers: headers, observe: 'response' }).subscribe((res: any) => {
        // this.simpleAlert('Erro', '', 'teste '+ JSON.stringify(res));

        if (res.status == 200) {
          /* Salva na memória do dispositivo */
          this.LocalDb.set('userData', res.body);
          this.LocalDb.set('islogged', true);
          /* Salva na memória na sessão do app */

          this.SessionProvider.userData = res.body;
          this.SessionProvider.islogged = true;

          this.event.publish("user:login");
          
          /* Direciona para a Home */
          resolve(true);
        } else {
          this.simpleAlert('Erro', '', 'Problema ao autenticar no servidor. code: '+res.status);
        }
      }, error => { 
          this.simpleAlert('Erro', '', 'Não foi possível estabelecer uma conexão com o servidor. Verifique sua conexão.');
      });
    });
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
