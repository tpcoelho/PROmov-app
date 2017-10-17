import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  lingua = "";
  settingsReady = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private sessionProvider: SessionProvider
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    if(this.sessionProvider.userConfig.language){
      this.lingua = this.sessionProvider.userConfig.language;
    }else{
      this.lingua = "pt-br";
    }
  }

  changeLanguage(selectedLanguage){
    this.translate.use(selectedLanguage);
    //TODO: persistir mudanca
  }

}
