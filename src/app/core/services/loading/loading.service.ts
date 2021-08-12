import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

constructor(    private loadingController: LoadingController) { }

async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
  });
  await loading.present();
  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');

}

dismiss()
{
this.loadingController.dismiss()


}


}
