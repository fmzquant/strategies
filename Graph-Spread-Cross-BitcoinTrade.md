
> Name

Graph-Spread-Cross-BitcoinTrade

> Author

btcvegas



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|timeout|60000|timeout (ms)|


> Source (javascript)

``` javascript


var cfgBidAskBtd = {
    title: {text: 'Bid/Ask - BTD'},
    xAxis: {type: 'datetime'},
    series: [
            {name: 'BTC/BRL', type: 'line', data: []}, 
            {name: 'ETH/BRL', type: 'line', data: []},
            {name: 'LTC/BRL', type: 'line', data: []},
            {name: 'BCH/BRL', type: 'line', data: []},
            {name: 'XRP/BRL', type: 'line', data: []},
            {name: 'EOS/BRL', type: 'line', data: []},
            {name: 'DAI/BRL', type: 'line', data: []},
        ]
}

var cfgBtdBinanceCross = {
    title: {text: 'BTD - Binance Cross'},
    xAxis: {type: 'datetime'},
    series: [
            {name: 'BTC/BRL', type: 'line', data: []}, 
            {name: 'ETH/BRL', type: 'line', data: []},
            {name: 'XRP/BRL', type: 'line', data: []},
            {name: 'LTC/BRL', type: 'line', data: []},
            {name: 'DAI/BRL', type: 'line', data: []}
        ]
}

var cfgBtdBinanceTriangular = {
    title: {text: 'BTD - Binance Triangular'},
    xAxis: {type: 'datetime'},
    series: [
            {name: 'EOS/BRL/USDT', type: 'line', data: []},
            {name: 'BCH/BRL/USDT', type: 'line', data: []},
            {name: 'BTC/BRL/USDT', type: 'line', data: []}, 
        ]
}

var cfgBinanceUsdtBrlArb = {
    title: {text: 'USDT/BRL/USD Arbitrage'},
    xAxis: {type: 'datetime'},
    series: [
            {name: 'USDT/BRL/USD', type: 'line', data: []},
        ]
}

function updateBRLBidAsk(chart) {
    timestamp = new Date().getTime()
    $.updateTicker(bitcointrade, bitcointrade, "BRLBTC", "BRLBTC", cfgBidAskBtd, 0, 1, chart, timestamp)
    $.updateTicker(bitcointrade, bitcointrade, "BRLETH", "BRLETH", cfgBidAskBtd, 1, 1, chart, timestamp)
    $.updateTicker(bitcointrade, bitcointrade, "BRLLTC", "BRLLTC", cfgBidAskBtd, 2, 1, chart, timestamp)
    $.updateTicker(bitcointrade, bitcointrade, "BRLBCH", "BRLBCH", cfgBidAskBtd, 3, 1, chart, timestamp)
    $.updateTicker(bitcointrade, bitcointrade, "BRLXRP", "BRLXRP", cfgBidAskBtd, 4, 1, chart, timestamp)
    $.updateTicker(bitcointrade, bitcointrade, "BRLEOS", "BRLEOS", cfgBidAskBtd, 5, 1, chart, timestamp)
    $.updateTicker(bitcointrade, bitcointrade, "BRLDAI", "BRLDAI", cfgBidAskBtd, 6, 1, chart, timestamp)
}

function updateBRLData(chart) {
    timestamp = new Date().getTime()
    binance_spot.SetCurrency("BTC_BRL")
    $.updateTicker(bitcointrade, binance_spot, "BRLBTC", "BTCBRL", cfgBtdBinanceCross, 7, 1, chart, timestamp)
    binance_spot.SetCurrency("ETH_BRL")
    $.updateTicker(bitcointrade, binance_spot, "BRLETH", "ETHBRL", cfgBtdBinanceCross, 8, 1, chart, timestamp)
    binance_spot.SetCurrency("XRP_BRL")
    $.updateTicker(bitcointrade, binance_spot, "BRLXRP", "XRPBRL", cfgBtdBinanceCross, 9, 1, chart, timestamp)
    binance_spot.SetCurrency("LTC_BRL")
    $.updateTicker(bitcointrade, binance_spot, "BRLLTC", "LTCBRL", cfgBtdBinanceCross, 10, 1, chart, timestamp)
    binance_spot.SetCurrency("USDT_BRL")
    usdt_brl = $.updateTicker(bitcointrade, binance_spot, "BRLDAI", "USDTBRL", cfgBtdBinanceCross, 11, 1, chart, timestamp)

    /// Triangular
    binance_spot.SetCurrency("EOS_USDT")
    $.updateTicker(bitcointrade, binance_spot, "BRLEOS", "EOSUSDT", cfgBtdBinanceTriangular, 12, 1 / usdt_brl, chart, timestamp)
    binance_spot.SetCurrency("BCH_USDT")
    $.updateTicker(bitcointrade, binance_spot, "BRLBCH", "BCHUSDT", cfgBtdBinanceTriangular, 13, 1 / usdt_brl, chart, timestamp)
    binance_spot.SetCurrency("BTC_USDT")
    $.updateTicker(bitcointrade, binance_spot, "BRLBTC", "BTCUSDT", cfgBtdBinanceTriangular, 14, 1 / usdt_brl, chart, timestamp)

    // USD BRL
    binance_spot.SetCurrency("USDT_BRL")
    $.updateTicker(polygon, binance_spot, "BRLUSD", "USDTBRL", cfgBinanceUsdtBrlArb, 15, 1, chart, timestamp)
}


function main() {
    binance_spot = exchanges[0]
    bitcointrade = exchanges[1]
    polygon = 'polygon'
    
    var chart = Chart([cfgBidAskBtd, cfgBtdBinanceCross, cfgBtdBinanceTriangular, cfgBinanceUsdtBrlArb]);
    //chart.reset()

    while (true) {
        try {
            updateBRLBidAsk(chart)
            updateBRLData(chart)
            
        }
        catch(err){
        
        }
        Sleep(timeout)
    }
}
```

> Detail

https://www.fmz.com/strategy/269000

> Last Modified

2021-07-12 20:41:21
