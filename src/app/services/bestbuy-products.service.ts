import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BestbuyProductsService {
  private apiKey = environment.bestBuyApiKey;
  constructor(public http: HttpClient) { }

  getBestBuyProducts(searchProduct) {
    let str = 'search=' + searchProduct[0];
    const length = searchProduct.length;
    for (let i = 1; i < length; i++) {
      str = str + '&' + 'search=' + searchProduct[i];
    }

    const url = 'https://api.bestbuy.com/v1/products((' + str + '))?&apikey=' + this.apiKey + '&pageSize=30&format=json';
    return this.http.get(url);
  }

  getBestBuyMostPopularProducts() {
    const str = '';
    const url = 'https://api.bestbuy.com/beta/products/mostViewed?apiKey=' + this.apiKey;
    return this.http.get(url);
  }
}
