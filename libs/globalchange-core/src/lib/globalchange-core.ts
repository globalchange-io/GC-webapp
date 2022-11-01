export function globalchangeCore(): string {
  return 'globalchange-core';
}


export class GCCoreService {

  cpiPrice: number;

  constructor() {
    this.cpiPrice = 1;
  }

}