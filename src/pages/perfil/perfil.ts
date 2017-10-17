import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  user:any;
  private months = ["M_JAN","M_FEB","M_MAR","M_APRIL","M_May","M_JUNE","M_JULY","M_AUGUST","M_SEPTEMBER","M_OCTOBER","M_NOVEMBER","M_DECEMBER"];
  month:any;
  year:any;

  constructor(public navCtrl: NavController,
    public translate: TranslateService,
    private sessionProvider: SessionProvider
    ) {

    this.user = this.sessionProvider.userData;
    if(this.user.createdAt){
      this.month = this.months[new Date(this.user.createdAt).getMonth()];
      this.year = new Date(this.user.createdAt).getFullYear();
    }
    this.user.levelString = 'PERFIL_LEVEL_0';
   
    // this.user = {
    //   photo: "assets/img/img/avatar-luke.png",
    //   name: "Mario Gomes",
    //   memberDate: "Set/2014",
    //   level: "Futuro Rock star",
    //   position: 12,
    //   points: 30.123
    // }
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    
  }

}
