import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  IonRouterOutlet,
  ModalController,
  ToastController
} from '@ionic/angular';
import { PlaylistContent } from 'src/app/interfaces/interfaces';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.page.html',
  styleUrls: ['./add-playlist.page.scss']
})
export class AddPlaylistPage implements OnInit {
  currentUser: any;
  playlists = [];
  newContent: PlaylistContent;
  content;
  state;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public playlistService: PlaylistService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;

      const collectionRef = this.playlistService.getPlaylistByUserId(
        this.currentUser.multiFactor.user.uid
      );

      collectionRef.valueChanges().subscribe(data => {
        this.playlists = data;
        console.log(data);
      });
    });
  }

  addContentToThisPlaylist(id) {
    // const playlistName = '';
    const playlistInfo = this.playlists.find(pl => {
      return pl.pid == id;
    });

    const contentInPlaylist = playlistInfo.pcontent;
    const playlistName = playlistInfo.pname;

    if (this.state == 'tmbd') {
      this.defineMovie();
    } else if (this.state == 'Videogame') {
      this.defineGame();
    }

    if (this.newContent != null) {
      this.playlistService.updatePlaylistById(id, {
        pcontent: [...contentInPlaylist, this.newContent]
      });
    }

    this.modalController.dismiss({
      dismissed: true
    });

    console.log(playlistName);

    this.presentAddToPlaylistsToast(playlistName);
  }

  defineMovie() {
    this.newContent = {
      id: this.content.id,
      title: this.content.title ? this.content.title : this.content.name,
      poster_path: this.content.poster_path,
      media_type: this.content.media_type,
      release_date: this.content.release_date
        ? this.content.release_date
        : this.content.first_air_date,
      overview: this.content.overview
    };
  }

  defineGame() {
    this.newContent = {
      id: this.content.id,
      title: this.content.name,
      poster_path: this.content.background_image,
      media_type: 'Videogame',
      release_date: this.content.released,
      overview: this.content.short_screenshots
    };
  }

  async presentAddToPlaylistsToast(text) {
    const toast = await this.toastController.create({
      message: 'Agregado a "' + text + '"',
      duration: 1500,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
