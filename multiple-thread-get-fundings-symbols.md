
> Name

multiple-thread-get-fundings-symbols

> Author

发明者量化

> Strategy Description


# Multi-Platform Futures Funding Rate Retrieval and Monitoring Strategy

### Description:
This strategy retrieves and monitors funding rates across multiple futures platforms (e.g., OKCoin, Binance, Bitget). It uses parallel threads to poll the perpetual contract markets on various exchanges and retrieve funding rate data, with a delay mechanism to optimize request frequency.

### Features:
- **Multi-Platform Support**: Synchronizes funding rates from several trading platforms, each with customized request delays.
- **Symbol Specific Retrieval**: Allows retrieval of funding rates for specific trading pairs (e.g., BTC/USDT, ETH/USDT).
- **Optimized for Different Platforms**: Distinguishes between platforms that require iteration over individual markets (e.g., OKCoin) and those that do not (e.g., Binance).

### Usage:
You can adjust the platform list, symbol list, and polling intervals to suit your specific trading requirements.




> Source (javascript)

``` javascript

function startFundingWorker() {
    exchanges.forEach((_, pos) => {
        __Thread(function (pos) {
            let e = exchanges[pos]
            let eName = e.GetName()
            let delaySettings = {
                'Futures_OKCoin': 20,
                'Futures_Binance': 500,
            }
            let needInterate = ['Futures_OKCoin', 'Futures_Bitget','Futures_OKX', 'Futures_KuCoin', 'Futures_MEXC', 'Futures_Crypto', 'Futures_Deribit']
            let delay = function () {
                let n = delaySettings[eName]
                if (n) {
                    Sleep(n)
                }
            }
            let epoch = 60000*2;
            let ts = 0;
            let fundings = {}
            while (true) {
                let now = new Date().getTime()
                if (now - ts < epoch) {
                    Sleep(1000)
                    continue
                }
                let markets = e.GetMarkets()
                if (!markets) {
                    Sleep(1000)
                    continue
                }
                if (needInterate.includes(eName)) {
                    for (let symbol in markets) {
                        if (symbol.includes('.swap')) {
                            let ret = e.GetFundings(symbol)
                            if (ret) {
                                for (let r of ret) {
                                    fundings[r.Symbol] = r
                                }
                            }
                            delay();
                        }
                    }
                } else {
                    let zones = []
                    for (let symbol in markets) {
                        if (symbol.includes('.swap') && !zones.includes(markets[symbol].QuoteAsset)) {
                            zones.push(markets[symbol].QuoteAsset)
                            let ret = e.GetFundings(markets[symbol].QuoteAsset + '.swap')
                            if (ret) {
                                for (let r of ret) {
                                    fundings[r.Symbol] = r
                                }
                            }
                            delay();
                        }
                    }
                }
                ts = now
                __threadSetData(0, eName+"_funding", fundings)
            }
        }, pos)
    })
}

function getFundings(eName, symbols) {
    let fundings = __threadGetData(0, eName+"_funding")
    if (!fundings) {
        return null
    }

    if (typeof(symbols) === 'undefined') {
        return fundings
    }

    let ret = {}
    symbols.forEach((s) => {
        if (fundings[s]) {
            ret[s] = fundings[s]
        }
    })
    return ret
}

function main() {
    startFundingWorker()
    while (true) {
        exchanges.forEach((e) => {
            let eName = e.GetName()
            let fundings = getFundings(eName, ['BTC_USDT.swap', 'ETH_USDT.swap'])
            Log(eName, fundings)
        })
        Sleep(5000)
    }
}
```

> Detail

https://www.fmz.com/strategy/470345

> Last Modified

2024-10-24 18:36:42
