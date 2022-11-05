export interface CoingeckoStellarRequest {
    stellar: PricesList
}

interface PricesList {
    usd: number,
}