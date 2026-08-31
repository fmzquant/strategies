
> Name

crawl-Binance-announcements-and-sell-Delist-coin

> Author

小草

> Strategy Description

Crawl the Binance announcement page and monitor the two most recent delisting notices. Typical announcement formats include “Binance Will Delist CLOAK, MOD, SALT, SUB and WINGS” and “Binance Will Delist BCN, CHAT, ICN and TRIG”.

The crawler watches for new delisting announcements using the keyword “Will Delist”. Binance may change its announcement format in the future, so this strategy can be extended accordingly. Because the crawling task itself is simple, it is implemented in plain JavaScript. After a delisted coin is detected, the strategy checks the account. If any delisted coin is still held, it first cancels unfinished orders and then sells the remaining balance at a relatively low price until the position is fully liquidated.
Detailed analysis: https://zhuanlan.zhihu.com/p/57012933
> Source (javascript)

``` javascript
var exchangeInfo = JSON.parse(HttpQuery('https://api.binance.com/api/v1/exchangeInfo'))
var pairInfo = {} 
var downList = []
if(exchangeInfo){
    for (var i=0; i<exchangeInfo.symbols.length; i++){
        var info = exchangeInfo.symbols[i];
        pairInfo[info.symbol] = {minQty:parseFloat(info.filters[2].minQty),tickerSize:parseFloat(info.filters[0].tickSize), 
            stepSize:parseFloat(info.filters[2].stepSize), minNotional:parseFloat(info.filters[3].minNotional)}
    }
}else{
    Log('fail to get exchangeInfo')
}
function sellAll(coin, free){
    var symbol = coin + 'BTC'
    exchange.IO("currency", coin+'_BTC')
    var ticker = _C(exchange.GetTicker)
    var sellPrice = _N(ticker.Buy*0.7, parseInt((Math.log10(1.1/pairInfo[symbol].tickerSize))))
    var sellAmount = _N(free, parseInt((Math.log10(1.1/pairInfo[symbol].stepSize))))
    if (sellAmount > pairInfo[symbol].minQty && sellPrice*sellAmount > pairInfo[symbol].minNotional){
        var id = exchange.Sell(sellPrice, sellAmount, symbol)
        exchange.CancelOrder(order.orderId)
    }
}
function cancellOrder(){
    var openOrders = exchange.IO('api', 'GET', '/api/v3/openOrders')
    for (var i=0; i<openOrders.length; i++){
        var order = openOrders[i];
        for (var j=0;j<downList.length;j++){
            if(order.symbol.startsWith(downList[j])){
                var currency = downList[j] + '_' + order.symbol.slice(downList[j].length);
                Log('delist coin exist, cancel all orders first', currency)
                exchange.IO("currency", currency)
                exchange.CancelOrder(order.orderId)
            }
        }
    }
}
function checkAccount(){
    var done = false
    while(!done){
        account = _C(exchange.GetAccount)
        done = true
        for (var i=0; i<account.Info.balances.length; i++){
            if(downList.indexOf(account.Info.balances[i].asset)>-1 && parseFloat(account.Info.balances[i].free)>pairInfo[account.Info.balances[i].asset+'BTC'].minQty){
                Log('this coin will be dumped', account.Info.balances[i].asset)
                sellAll(account.Info.balances[i].asset, parseFloat(account.Info.balances[i].free))
                done = false
            }
        }
        Sleep(1000)
    }
    Log('sell done')
}
function main() {
    var title = ''
    while(true){
        var html = HttpQuery('https://support.binance.com/hc/en-us/sections/115000202591-Latest-News')
        html = html.slice(html.indexOf('Delist '),html.length)
        if(html){
            if(html.slice(7,html.indexOf('</a>')) != title){
                title = html.slice(7,html.indexOf('</a>'))          
                downList = html.slice(7,html.indexOf('</a>')).replace(' and ', ',').split(',')
                Log('new announcement，will delist:', downList)
                cancellOrder()
                checkAccount()
            }else{
                Log('new announcement was not found')
            }
        }else{
            Log('web spider wrong')
        }
        Sleep(60*1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/137450

> Last Modified

2019-07-03 16:16:39
