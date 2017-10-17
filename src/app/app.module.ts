import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { FeedPage } from '../pages/feed/feed';
import { ChallengePage } from '../pages/challenge/challenge';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { CameramodalPage } from '../pages/cameramodal/cameramodal';
import { PerfilPage } from '../pages/perfil/perfil';


import { LocalDb } from '../providers/local-db/local-db';
import { Api } from '../providers/api/api';
import { SessionProvider } from '../providers/session/session';

import { Facebook } from '@ionic-native/facebook';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { SwingModule } from 'angular2-swing';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    FeedPage,
    ChallengePage,
    SettingsPage,
    LoginPage,
    PerfilPage,
    CameramodalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SwingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedPage,
    ChallengePage,
    SettingsPage,
    LoginPage,
    PerfilPage,
    CameramodalPage
  ],
  providers: [
    StatusBar,
    Facebook,
    Camera,
    File,
    FileTransfer,
    SplashScreen,
    Api,
    SessionProvider,
    LocalDb,
    Geolocation,
    // Keep this to enable Ionic's runtime error handling during development
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
