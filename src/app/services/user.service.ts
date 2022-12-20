import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public afs: AngularFirestore) {}


  async updateProfilePicture(id, contentBody) {
    const UserDocRef = this.afs.doc(`users/${id}`);

    const docObj = await UserDocRef.update(contentBody);

    return docObj;
  }
}



