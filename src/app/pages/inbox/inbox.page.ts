import { Component, OnInit } from '@angular/core';
import { FansChats } from 'src/app/interfaces/interfaces';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss']
})
export class InboxPage implements OnInit {
  currentUser = null;
  chats: FansChats[] = [];

  usersIHaveChatWith = null;

  constructor(
    private dataService: DataService,
    public nav: NavController,
    private chatService: ChatService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Fans:', this.usersIHaveChatWith);
      this.currentUser = user;

      //Cambio de estado
      this.renderChats();
    });
  }

  ngOnInit() {
  }

  async renderChats() {
    const currentUserDoc = await this.chatService.getCurrentUser(
      this.currentUser.multiFactor.user.uid
    );

    currentUserDoc.subscribe(async doc => {
      const userData = doc.get('chats');

      const chats = await this.chatService.getChatsByIds(userData);

      let conversations = chats.map(chat => {
        const conversationId = chat.id;
        let participants = chat.data();

        participants = participants.participants.filter(participant => {
          return participant != this.currentUser.uid;
        });

        return { participants: [...participants], conversationId };
      });

      //--------
      let users = conversations.map(conv => {
        return conv.participants;
      });

      users = users.concat.apply([], users);

      this.chatService.getUserByIds(users).subscribe(users => {
        conversations = conversations.map(conv => {
          const user = users.find(user => {
            return user.uid == conv.participants[0];
          });

          conv.participants = [user];
          return conv;
        });

        this.usersIHaveChatWith = conversations;
        console.log('Fans2:', this.usersIHaveChatWith);
      });
    });
    console.log('user', this.currentUser);
  }

  pushToNextScreenWithParams(pageUrl: string, params: any) {
    this.nav.navigateForward(pageUrl, { state: params });
  }
}
