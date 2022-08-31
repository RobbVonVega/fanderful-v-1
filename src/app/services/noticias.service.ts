import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';

const apiUrl = environment.newsApiConfig.apiURL;
const apiKey = environment.newsApiConfig.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getNoticias(){
    // return this.http.get<RespuestaTopHeadLines>('https://newsapi.org/v2/ctop-headlines?ountry=us&
    // category=business&apiKey=9e1e8f7482984b989e2be4e516e5292a');
    return this.ejecutarQuery<RespuestaTopHeadLines>(`top-headlines?category=entertainment`);
  }

  getNoticiasCategoria( categoria: string ){
    // return this.http.get<RespuestaTopHeadLines>('https://newsapi.org/v2/top-headlines?country=us&
    // category=science&apiKey=9e1e8f7482984b989e2be4e516e5292a');
    return this.ejecutarQuery<RespuestaTopHeadLines>(`top-headlines?category=${categoria}`);
  }

  private ejecutarQuery<T>( query: string ){
    return this.http.get<T>(`${apiUrl}${query}`,{params:{
      apiKey,
      country: 'us'
    }});
  }
}
