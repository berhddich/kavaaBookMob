import { Component, OnInit } from '@angular/core';
import { SignalrService } from './core/services/signalr/signalr.service';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  constructor( public _signalrService: SignalrService,
    private storage: Storage,
    private splashScreen: SplashScreen) {
      storage.create();

  }

  ngOnInit()
  {
    // this._signalrService.startConnection();
    this.splashScreen.show();
  }






}
