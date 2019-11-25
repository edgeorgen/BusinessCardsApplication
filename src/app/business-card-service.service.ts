import { Injectable } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { WebcamImage } from 'ngx-webcam';



@Injectable({
  providedIn: 'root'
})
export class BusinessCardServiceService {
  uid: string;
  email: string;
  fullText: string;
  name: string;
  phone: string;
  imageUrl: string;
  public webcamImage: WebcamImage = null;
  cardId: string;

  constructor(private afs: AngularFirestore) { }

  create(fullText: string, email: string, name: string, phone: string, imageUrl: string, uid: string) {
    this.fullText = fullText;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.uid = uid;
    this.afs.doc('Users/' + this.uid).set({
    });
    this.afs.collection('Users/' + this.uid + '/BusinessCards' + this.uid).add({
      fullText: this.fullText,
      name: this.name,
      phone: this.phone,
      imageUrl: this.imageUrl,
      email: this.email,
      uid: this.uid
    });


  }

  getCard() {
    return this.afs.collection('Users/' + this.uid + '/BusinessCards' + this.uid).snapshotChanges();
  }

  deleteCard(cardId: string, uid: string) {
    this.cardId = cardId.toString();
    this.uid = uid;
    this.afs.collection('Users/' + this.uid + '/BusinessCards' + this.uid).doc(cardId).delete();
    // console.log(cardId);
    // console.log(this.uid);
  }

  updateCardName(cardId: string, uid: string, name: string) {
    this.cardId = cardId.toString();
    this.uid = uid;
    this.name = name;
    this.afs.collection('Users/' + this.uid + '/BusinessCards' + this.uid).doc(cardId).update({
      name: this.name
    });
    // console.log(cardId);
    // console.log(this.uid);
  }

  updateCardEmail(cardId: string, uid: string, email: string) {
    this.cardId = cardId.toString();
    this.uid = uid;
    this.email = email;
    this.afs.collection('Users/' + this.uid + '/BusinessCards' + this.uid).doc(cardId).update({
      email: this.email
    });
    // console.log(cardId);
    // console.log(this.uid);
  }

  updateCardPhone(cardId: string, uid: string, phone: string) {
    this.cardId = cardId.toString();
    this.uid = uid;
    this.phone = phone;
    this.afs.collection('Users/' + this.uid + '/BusinessCards' + this.uid).doc(cardId).update({
      phone: this.phone
    });
    // console.log(cardId);
    // console.log(this.uid);
  }

  updateFullText(cardId: string, uid: string, fullText: string) {
    this.cardId = cardId.toString();
    this.uid = uid;
    this.fullText = fullText;
    this.afs.collection('Users/' + this.uid + '/BusinessCards' + this.uid).doc(cardId).update({
      fullText: this.fullText
    });
  }

}
