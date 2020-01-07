import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EbayProductsService {

  constructor(public http: HttpClient) { }

  getEbayLaptops() {
    return this.getEBayProducts('laptop');
}

  getEBayProducts(searchTerm) {
    // this.getToken().subscribe(res => console.log("res "+res));
    const token = environment.eBayToken;
    const url = 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=' + searchTerm + '&priceCurrency=USD';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    return this.http.get(url, httpOptions);
  }

  private getToken() {
    const appId = environment.eBayAppId;
    const encodeBytes = btoa(appId);
    const body = {
      grant_type: 'client_credentials',
      scope: 'https://api.ebay.com/oauth/api_scope'
    };
    const auth = 'Basic ' +   encodeBytes;
    console.log(auth);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: auth,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      })
    };
    console.log(httpOptions);
    return this.http.post('https://api.ebay.com/identity/v1/oauth2/token', body, httpOptions);
  }
}
