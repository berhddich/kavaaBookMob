import { Component, OnInit } from '@angular/core';
import { SignalrService } from './core/services/signalr/signalr.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  constructor( public _signalrService:SignalrService) {


  }

  ngOnInit()
  {
    this._signalrService.startConnection();

  }






}
