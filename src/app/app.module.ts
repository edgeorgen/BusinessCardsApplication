import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { WebCamComponent } from './web-cam/web-cam.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthorizationService } from './auth-service.service';
import {WebcamModule} from 'ngx-webcam';
import { HttpClientModule} from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { BusinessCardComponent } from './business-card/business-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SignInComponent,
    WebCamComponent,
    CreateUserComponent,
    BusinessCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    WebcamModule,
    HttpClientModule
  ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

