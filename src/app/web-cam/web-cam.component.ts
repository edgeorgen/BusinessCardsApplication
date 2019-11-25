import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';
import { visionApi } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthorizationService } from '../auth-service.service';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BusinessCardServiceService } from '../business-card-service.service';
import { BusinessCard } from '../business-card/business-card.model';

@Component({
  selector: 'app-root',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.scss']
})
export class WebCamComponent implements OnInit {
  public On = true;
  public wcImage: WebcamImage = null;
  private taker: Subject<void> = new Subject<void>();
  public base64;
  public url = `https://vision.googleapis.com/v1/images:annotate?key=${visionApi.key}`;
  public parsedImage;
  email: string;
  fullText: string;
  name: string;
  phone: string;
  imageUrl: string;
  uid = JSON.parse(localStorage.getItem('uid'));

  private cardCollection: AngularFirestoreCollection<BusinessCard>;
  businessCards: Observable<BusinessCard[]>;

  constructor(private http: HttpClient,
              public afAuth: AngularFireAuth,
              public router: Router,
              private dashService: AuthorizationService,
              private afs: AngularFirestore,
              public bcService: BusinessCardServiceService) {

  }
  public createBusinessCard(wcImage: WebcamImage): void {
    this.wcImage = wcImage;
    this.base64 = this.wcImage.imageAsBase64;
    this.imageUrl = this.wcImage.imageAsDataUrl;
    this.parsedImage = this.base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    const request: any = {
      'requests': [
        {
          'image': {
            'content': this.parsedImage
          },
          'features': [
            {
              'type': 'TEXT_DETECTION'
            }
          ]
        }
      ]
    };
    console.log(request);
    console.log(this.parsedImage);
    this.http.post(
      this.url,
      request
    ).subscribe((results: any) => {
      console.log('RESULTS');
      console.log(results);
      console.log(results.responses[0].fullTextAnnotation.text);
      this.fullText = results.responses[0].fullTextAnnotation.text;
      this.email = JSON.stringify(this.fullText.match(/[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+/));
      this.name = JSON.stringify(this.fullText.match(/^([A-Z][a-z]+)\s([A-Z][a-zA-Z-]+)$/igm));
      this.phone = JSON.stringify(this.fullText.match(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/));
      // tslint:disable-next-line: max-line-length
      this.bcService.create(this.fullText, this.email, this.name, this.phone, this.imageUrl, this.uid);
    });

  }
  public ngOnInit(): void {
    // tslint:disable-next-line: max-line-length
    this.cardCollection = this.afs.collection<BusinessCard>('Users/' + this.uid + '/BusinessCards' + this.uid);
    this.businessCards = this.cardCollection.valueChanges();
    this.cardCollection = this.afs.collection('Users/' + this.uid + '/BusinessCards' + this.uid);
    this.businessCards = this.cardCollection.valueChanges({ idField: 'id' });
  }

  public takeSnapshot(): void {
    this.taker.next();
  }

  public get takeObservable(): Observable<void> {
    return this.taker.asObservable();
  }
}
