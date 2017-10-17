import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class LocalDb {

  constructor(
      private storage: Storage
    ) {
  }

  get(key){
    return new Promise(resolve => {
      this.storage.get(key).then( (value) => {
        resolve(value);
      });
    });
  }

  set(key, data){
    this.storage.set(key, data);
  }

  /* Esse método deleta todo do banco de dados local. Só é utilizado no logout. */
  deleteAllLocalStorage(){
    return new Promise(resolve => {
      this.storage.clear().then( (value) => {
        resolve(true);
      });
    });
  }

}
