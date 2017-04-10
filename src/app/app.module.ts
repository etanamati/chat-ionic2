import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule } from "angularfire2";
import { ChatPage } from "../pages/chat/chat";
import { LoginPage } from "../pages/login/login";

export const firebaseConfig={
    apiKey: "AIzaSyDUmqgZZkAl-TtejrW7dwNfsZKWmst1xYM",
    authDomain: "chat-50afe.firebaseapp.com",
    databaseURL: "https://chat-50afe.firebaseio.com",
    projectId: "chat-50afe",
    storageBucket: "chat-50afe.appspot.com",
    messagingSenderId: "607379370887"
}

@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
