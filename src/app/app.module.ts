import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicGestureConfig } from '../../src/app/utils/IonicGestureConfig'
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },   {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig},Camera,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
