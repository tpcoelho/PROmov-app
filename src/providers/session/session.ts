import { Injectable } from '@angular/core';
/*import { Http } from '@angular/http';*/
import { LocalDb } from '../local-db/local-db';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionProvider {

  public islogged: any = false;
  public userData: any = [];
  public userConfig: any = [];

  constructor(
    private LocalDb: LocalDb
    ){
  	//Constructor
  }

  deleteSession(){
      this.userData = [];
      this.userConfig = [];
      this.islogged = false;
  }

}
