import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CharactersService {

  url = 'http://localhost:8080';
  urlProd = 'http://marvelapi-sydney.herokuapp.com'
  constructor(private http: HttpClient) { }

  getCharacters(offset,limit) : Observable<any> {
    //set the params
    let params = new HttpParams().set('offset', offset).set('limit',limit);
    
    return this.http.get(this.urlProd+'/characters',{ params: params }) ;
  }
}
