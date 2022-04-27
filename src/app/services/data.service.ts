import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    public angularFirestore: AngularFirestore
  ) {}

  getCollectionChanges<type>(path: string): Observable<type[]> {
    const itemPlay = this.angularFirestore.collection<type>(path);
    return itemPlay.valueChanges();
  }
}
