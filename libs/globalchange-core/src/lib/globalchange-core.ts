import { BehaviorSubject } from 'rxjs';
import { CoingeckoStellarRequest } from './models/requests-modeled';
import fetch from 'node-fetch'
import { Server, Keypair, Networks, TransactionBuilder, Operation, Asset, Memo } from 'stellar-sdk'


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

  async mine_and_min(gcs: number, publicKey: string, receivingCharitiesAddresses: string[]) {
    const server = new Server('https://horizon-testnet.stellar.org');
    const proxyAccount = Keypair.random()
    console.log(proxyAccount.publicKey())
    const account = await server.loadAccount(publicKey)
    const fee = await server.fetchBaseFee() * 100
    const xmlPerCharities = "10" // todo!

    const transactionBuilder = new TransactionBuilder(
      account, {
          fee: String(fee),
          networkPassphrase: Networks.TESTNET
      }
    )
    receivingCharitiesAddresses.forEach(address => {
      return transactionBuilder.addOperation(Operation.payment({
        destination: address,
        asset: Asset.native(),
        amount: xmlPerCharities
      }))
    });
    const tx = transactionBuilder.setTimeout(200).addMemo(Memo.text('GlobalChange ' + gcs)).build()
    tx.sign(proxyAccount)
    const resp = await server.submitTransaction(tx)
  }
    
  
}