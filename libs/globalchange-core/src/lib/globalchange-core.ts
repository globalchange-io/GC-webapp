import { BehaviorSubject, catchError, EMPTY, first, map, mergeMap } from 'rxjs';
import { RxJSHttpClient, HttpRequestConfig, HttpResponse } from 'rxjs-http-client'
import { CoingeckoStellarRequest } from './models/requests-modeled';

export function globalchangeCore(): string {
  return 'globalchange-core';
}


export class GCCoreService {

  private _cpiPrice = new BehaviorSubject<number>(300);
  readonly cpiPrice$ = this._cpiPrice.asObservable();

  private _stellarUsd = new BehaviorSubject<number>(0.1);
  readonly stellarUsd$ = this._stellarUsd.asObservable();

  private _http;

  constructor() {
    this._http = new RxJSHttpClient();
  }

  startup() {

    const config: Partial<HttpRequestConfig> = {headers: {"Accept": "application/json,text/plain,*/*","Content-Type":"text/plain"}}
    this._http.get('https://7horrxpc2jxymobmdyo3nhoeom0fvtwk.lambda-url.us-east-1.on.aws/', config)
    .pipe(
      catchError((a) => {
        console.error('Failed to fetch cpi price');
        console.error(a);
        return EMPTY;
      }),
      mergeMap((x: HttpResponse) => x.json())
    ).subscribe(x => {
      this._cpiPrice.next(x as number)
    })

    this._http.get('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd', config)
    .pipe(
      catchError((a) => {
        console.error('Failed to fetch stellar price');
        console.error(a);
        return EMPTY;
      }),
      mergeMap((x: HttpResponse) => x.json())
    ).subscribe((x: CoingeckoStellarRequest) => {
      const price = x.stellar.usd
      if (price)
        this._stellarUsd.next(price)
      else
        console.error(x)
    })
  }

}