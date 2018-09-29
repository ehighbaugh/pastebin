import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class PastebinService {

// api/pastebin sims server api
  private pastebinUrl = 'api/pastebin';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  // GET: returns promise
  public getPastebin(): Promise<any> {
    return this.http.get(this.pastebinUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error );
  }
}
