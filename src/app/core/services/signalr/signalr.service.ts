import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public hubConnecttion: signalR.HubConnection;

  constructor() { }

  public startConnection = () => {

    this.hubConnecttion = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44392/notificationHub')
      .build();

    this.hubConnecttion
      .start()
      .then(() => { console.log("connection started") })
      .catch(error => { console.log('Error while starting connectio  sdssssssssssssssssss: ' + error) })

  }


  addComment(comments:any)
  {
    this.hubConnecttion.invoke("addComment",comments)
    .catch(err=>console.log(err));

  }

}
