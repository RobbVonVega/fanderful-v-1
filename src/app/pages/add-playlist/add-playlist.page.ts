import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.page.html',
  styleUrls: ['./add-playlist.page.scss']
})
export class AddPlaylistPage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
