import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

const apiUrl = environment.videogamesAPIConfig.apiURL;
const apiKey = environment.videogamesAPIConfig.apiKey;

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {
  date: Date = new Date();
  finalData;

  today = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  priorDate = this.date.setDate(this.date.getDate() - 14);
  twoWeeksAgo = this.datepipe.transform(this.priorDate, 'yyyy-MM-dd');

  constructor(
    public navCtrl: NavController,
    public datepipe: DatePipe,
    private http: HttpClient
  ) {}

  getTrendingVG() {
    console.log(this.twoWeeksAgo + ',' + this.today);

    return this.http.get(
      'https://api.rawg.io/api/games?ordering=-added&page_size=20&key=' +
        apiKey +
        '&dates=' +
        this.twoWeeksAgo +
        ',' +
        this.today
    );
  }

  getSearchVG(query) {

    return this.http.get(
      'https://api.rawg.io/api/games?ordering=-added&page_size=20&key=' +
        apiKey +
        '&search_precise&search=' +
        query
    );
  }

  getGameDetails(id) {
    return this.http.get(
      'https://api.rawg.io/api/games/' + id + '?key=' + apiKey
    );
  }
}
