import { Component, OnInit } from '@angular/core';
import { FansChats } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  chats: FansChats[] = [];

  constructor( private dataService: DataService) { }

  ngOnInit() {
    this.getChats();
  }

  getChats() {
    const path = 'users/g5r4iy7pZlb3Ds5U9QRqRe9z2LB2/FansChats';
    this.dataService.getCollectionChanges<FansChats>(path).subscribe(res => {
      this.chats = res;
    });
  }
}
