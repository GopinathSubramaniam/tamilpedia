import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(url).toPromise();
  }

  post(url, data) {
    return this.http.post(url, data).toPromise();
  }

  put(url, data) {
    return this.http.get(url, data).toPromise();
  }

  delete(url) {
    return this.http.delete(url).toPromise();
  }

}
