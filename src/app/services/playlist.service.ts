import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, collection, updateDoc, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient, public afs: AngularFirestore) {}

  handleDoc(id = '', contentBody = {}) {
    let docObj;

    this.afs
      .collection('playlists', ref => ref.where('id', '==', id))
      .snapshotChanges()
      .subscribe(res => {
        if (res.length > 0) {
          console.log('Updating');
          docObj = this.updatePlaylistById(id, contentBody);
        } else {
          console.log('Creating');
          docObj = this.createPlaylist(contentBody);
        }
      });

    return docObj;
  }

  async createPlaylist(playlist) {
    const collectionRef = this.afs.collection('playlists');

    const docRef = await collectionRef.add(playlist);

    this.updatePlaylistById(docRef.id, {
      pid: docRef.id
    });
  }

  async updatePlaylistById(id, contentBody) {
    const playlistDocRef = this.afs.doc(`playlists/${id}`);

    const docObj = await playlistDocRef.update(contentBody);

    return docObj;
  }

  getPlaylistByUserId(userid) {
    return this.afs.collection('playlists', ref =>
      ref.where('puserid', '==', userid)
    );
  }

  deletePlaylistByPId(id) {
    return this.afs.doc(`playlists/${id}`).delete();
  }

  //Recuperar currentUser
  getCurrentUser(uid) {
    return this.afs.doc(`users/${uid}`).get();
  }
}
