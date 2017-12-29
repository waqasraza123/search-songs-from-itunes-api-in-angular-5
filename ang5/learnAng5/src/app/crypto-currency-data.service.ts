import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CryptoCurrencyDataService {

  data: any;
  constructor(private _http: Http) { }

  getprices() {
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD,EUR')
    .map( data => this.data=data );
  }

}
