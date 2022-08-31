import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaPopularMovies } from '../interfaces/interfaces';

const apiUrl = environment.tmbdMovieConfig.apiUrl;
const apiKey = environment.tmbdMovieConfig.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(public navCtrl: NavController, private http: HttpClient) {}

  getTrendingMovies(category) {
    return this.http.get(
      'https://api.themoviedb.org/3/trending/' +
        category +
        '/week?api_key=' + apiKey
    );
  }

  getSearchContent(category, query) {
    return this.http.get(
      'https://api.themoviedb.org/3/search/' +
      category + '?api_key=' +
      apiKey + '&query=' +
      query + '&language=en-US&page=1&include_adult=false'
    );
  }

  getContentById(category, id) {
    return this.http.get(
      'https://api.themoviedb.org/3/' +
      category + '/' + id + '?api_key=' + apiKey + '&language=en-US'
    );
  }
}
