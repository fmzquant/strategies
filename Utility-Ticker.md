
> Name

Utility-Ticker

> Author

btcvegas





> Source (javascript)

``` javascript


function getPrice(exchange, pair){
    
    var result = null

    if (exchange == 'polygon'){
        ret = HttpQuery("https://api.polygon.io/v1/last_quote/currencies/USD/BRL?&apiKey=csjY6ZuXAO41EZlGzTCPGJH_7YgkXwrB")
        Log("Polygon", ret)
        if (ret){
            parsed = JSON.parse(ret)
            Log("Parse", parsed)
            result = {
                Buy: parsed.last.bid, 
                Sell: parsed.last.ask 
            }
        }
    }
    else if (exchange.GetLabel() == "BitcoinTrade"){
        depth = $.Bitcointrade_GetDepth(pair)
        if (depth){
            result = {
                Buy: depth.Bids[0].Price, 
                Sell: depth.Asks[0].Price 
            }
        }
        else result = null
    }
    else {
        exchange.SetContractType(pair)
        result = exchange.GetTicker()
        _G(exchange.GetName()+pair, result)
    }

    Log("get price", pair, result)
    return result
}

$.updateTicker = function (exchange1, exchange2, contract1, contract2, graph, loc, conversionPrice, chart, timestamp){
    exchangeTicker1 = getPrice(exchange1, contract1)
    exchangeTicker2 = getPrice(exchange2, contract2)

    var spread = _N((((exchangeTicker2.Sell / conversionPrice) / exchangeTicker1.Buy) - 1) * 100, 2)

    Log(graph.title.text, contract1, contract2, spread, conversionPrice)

    graph.subtitle = {
        text: 'Spread: ' + spread,
    };

    if (spread < 50 && spread > -50){
        chart.add([loc, [timestamp, spread]]);
    }
    Sleep(2000)

    return exchangeTicker1.Buy

}
```

> Detail

https://www.fmz.com/strategy/268995

> Last Modified

2021-07-07 23:23:50
