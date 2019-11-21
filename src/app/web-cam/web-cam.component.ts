import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthorizationService } from '../auth-service.service';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.scss']
})
export class WebCamComponent implements OnInit {
  public On = true;
  public wcImage: WebcamImage = null;
  private taker: Subject<void> = new Subject<void>();

  constructor() {

  }
  public createBusinessCard(wcImage: WebcamImage): void {
    this.wcImage = wcImage;

  }
  public ngOnInit(): void {
  }

  public takeSnapshot(): void {
    this.taker.next();
  }

  public get takeObservable(): Observable<void> {
    return this.taker.asObservable();
  }
}
