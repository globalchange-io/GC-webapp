import { BehaviorSubject } from 'rxjs';
import { CoingeckoStellarRequest } from './models/requests-modeled';
import fetch from 'node-fetch'

export function globalchangeCore(): string {
  return 'globalchange-core';
}


export class GCCoreService {

  private _cpiPrice = new BehaviorSubject<number>(300);
  readonly cpiPrice$ = this._cpiPrice.asObservable();

  private _stellarUsd = new BehaviorSubject<number>(0.1);
  readonly stellarUsd$ = this._stellarUsd.asObservable();

  startup() {
    // const config: Partial<HttpRequestConfig> = {headers: {"Accept": "application/json,text/plain,*/*","Content-Type":"text/plain"}}
    fetch('https://7horrxpc2jxymobmdyo3nhoeom0fvtwk.lambda-url.us-east-1.on.aws/')
    .then((value) => {
      if (!value.ok) {
        console.error('Failed to fetch cpi price');
        console.error(value.statusText);
      }
      value.json().then((body: number) => this._cpiPrice.next(body))
      
    })
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd')
    .then((value) => {
      if (!value.ok) {
        console.error('Failed to fetch stellar price');
        console.error(value.statusText);
      }
      value.json().then((body: CoingeckoStellarRequest) => this._stellarUsd.next(body.stellar.usd))
    })
  }

}