import { ContentChild, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { PlaylistContent } from '../interfaces/interfaces';
// import 'firebase/<PACKAGE>';

// const timestamp = firebase.

export interface User {
  uid: string;
  // username: string;
  email: string;
}

export interface Message {
  createdAt: any;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  items: Observable<any>;

  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
    });
  }

  async addChatMessage(msg, chatid) {
    const time = await serverTimestamp();
    return this.afs.collection(`/chats/${chatid}/messages`).add({
      msg,
      from: this.currentUser.uid,
      createdAt: time,
      class: 'text'
      // createdAt: '7.06PM'
    });
  }

  async addChatContentMessage(msg: PlaylistContent, chatid){
    const time = await serverTimestamp();
    return this.afs.collection(`/chats/${chatid}/messages`).add({
      from: this.currentUser.uid,
      createdAt: time,
      class: 'shared',
      msgCId: msg.id,
      msgCmedia_type: msg.media_type,
      msgCtitle: msg.title,
      msgCoverview: msg.overview,
      msgCposter_path: msg.poster_path,
      msgCrelease_date: msg.release_date,      
    });
  }

  getChatMessages() {
    let users = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log('all users: ', users);
        return this.afs
          .collection('messages', ref => ref.orderBy('createdAt'))
          .valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;

          const { seconds, nanoseconds } = m.createdAt;
          m.createdAt = new Timestamp(seconds, nanoseconds).toDate();
        }
        console.log('all messages: ', messages);
        return messages;
      })
    );
  }

  getChatMessagesById(chatid) {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        // console.log('all users: ', users);
        console.log('chatId', chatid);
        return this.afs
          .collection(`/chats/${chatid}/messages`, ref =>
            ref.orderBy('createdAt')
          )
          .valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;

          if (m.createdAt?.seconds && m.createdAt?.nanoseconds) {
            const { seconds, nanoseconds } = m.createdAt;
            m.createdAt = new Timestamp(seconds, nanoseconds).toDate();
          }
        }
        console.log('all messages: ', messages);
        return messages;
      })
    );
  }

  getUsers() {
    //Asumir que cada persona tiene conversaciones diferentes
    //Array[conversation.uid]

    return this.afs
      .collection('users')
      .valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  //Recuperar currentUser
  getCurrentUser(uid) {
    return this.afs.doc(`users/${uid}`).get();
  }

  getChatsByIds(uids) {
    const promises = [];

    uids.forEach(chat => {
      promises.push(this.getChatById(chat));
    });

    return Promise.all(promises);
  }

  getChatById(uid) {
    return this.afs
      .doc(`chats/${uid}`)
      .get()
      .toPromise();
  }

  getUserByIds(uids) {
    return this.afs
      .collection(`users`, ref => ref.where('uid', 'in', uids))
      .valueChanges({ idField: 'uid' });
  }

  getUserForMsg(msgFromId, users: User[]): string {
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.email;
      }
    }
    return 'deleted';
  }

  addChatToUser(userId, userObj) {
    return this.afs.doc(`users/${userId}`).update(userObj);
  }

  /*   1. Crear un documento en coleccion chats
  2. Recuperar uid del nuevo chat
  3. Recuperar el objeto usuario de con quien quieres hablar
  4. Meter el uid del nuevo chat en el arreglo chats del objeto usuario
  5. addChatToUser con el uid del objeto usuario, y el objeto usuarioi modificado */
}
