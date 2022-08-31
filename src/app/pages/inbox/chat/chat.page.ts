import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  chat: any;
  user: any;
  messages: Message[];
  newMsg = '';

  constructor(private chatService: ChatService, private router: Router) {


    if (router.getCurrentNavigation().extras.state) {
      const {chat} = router.getCurrentNavigation().extras.state;
      this.chat = chat;
      this.user = chat.participants[0];
      console.log(this.user);
    }
  }

  ngOnInit() {
    this.chatService.getChatMessagesById(this.chat.conversationId).subscribe(msgs => {
      this.messages = msgs;
    })
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg, this.chat.conversationId).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom;
    })
  }
}
