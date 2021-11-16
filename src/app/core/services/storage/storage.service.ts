import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  firstTime: boolean;

  constructor(private storage: Storage) {
    this.init();
  }

  saveFirstTimeLoad(): void {
    this.storage.set('firstTime', true);
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
  }

  isFirstTimeLoad(): void {
    this.storage.get('firstTime').then((result) => {
      console.log(result);
      if (result != null) {
        this.firstTime = false;
      } else {
        this.firstTime = true;
      }
    });
  }
}
