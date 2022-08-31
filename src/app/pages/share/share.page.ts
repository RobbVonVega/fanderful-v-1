import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss']
})
export class SharePage implements OnInit {
  currentUser = null;
  usersIHaveChatWith = null;

  constructor(
    public modalController: ModalController,
    private chatService: ChatService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Fans:', this.usersIHaveChatWith);
      this.currentUser = user;

      //Cambio de estado
    });
    this.renderChats();
  }

  ngOnInit() {}

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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
