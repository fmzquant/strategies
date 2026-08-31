
> Name

Binance-Perpetual-Multi-Currency-Hedging-Strategy-for-Shorting-or-Longing-the-Altcoin-Index-April-10-Bugfix-Update-Needed

> Author

小草

> Strategy Description

## **Important Notes**

- Be sure to read this research article first: https://www.fmz.com/digest-topic/5294 . It explains the strategy logic, risks, symbol selection, parameter settings, position sizing, and total capital allocation.
- The previous research report needs to be downloaded and uploaded to your own research environment, then modified and run once. If you have already read it, note that the latest week of data has recently been added.
- **This strategy cannot be backtested directly; it must be backtested in the research environment.**
- The strategy code and default parameters are for research only. Use caution in live trading, decide parameters based on your own research, and **bear the risk yourself**.
- **The strategy will not make money every day. As the backtest history shows, 1-2 weeks of sideways action and drawdowns are normal, and drawdowns can be large, so it must be treated correctly.**
- The code is public and can be modified freely. If you have any questions, feel free to leave feedback in the comments. It is best to join the FMZ Binance discussion group mentioned in the research report to receive update notifications.
- **The strategy must run in cross-margin mode. Do not enable hedge mode / dual-side positions. It only supports Binance futures. When creating the bot, use the default trading pair and K-line period; the strategy does not use K-line data.**
- **This strategy conflicts with other strategies and manual trading, so use it separately.**
- Live trading requires an overseas host. During testing, you can rent an Alibaba Cloud Hong Kong server from the platform with one click, or rent your own monthly server more cheaply (the minimum configuration is enough). Deployment tutorial: https://www.fmz.com/bbs-topic/2848
- Binance futures and Binance spot must be added separately. The Binance futures exchange name is ``Futures_Binance``.

## Strategy Principles

The strategy shorts an equally weighted basket of selected altcoins while taking an equal-value long hedge in Bitcoin to reduce risk and volatility. As prices move, it continuously rebalances positions so that the short-side notional stays constant and the long hedge remains matched. **In essence, it shorts the altcoin-versus-Bitcoin price index.** Based on the most recent two months of performance (about 3x leverage, data updated through 4/8), the strategy lost money in the most recent week because altcoins outperformed Bitcoin. If you are bullish on altcoins, you can reverse the direction in the parameters and short Bitcoin while going long altcoins.

**By default the strategy is long Bitcoin and short altcoins, but you can reverse it yourself if you believe altcoins are near a bottom. The choice is yours.**

![IMG](https://www.fmz.com/upload/asset/24281c6de45544ca2b7.png)

## Strategy Logic

1. Update market quotes and account positions.
2. Update the short-position value of each altcoin and decide whether that short needs rebalancing.
3. Update the total short exposure, determine the required long hedge, and decide whether the long side needs rebalancing.
4. Place orders. Order size is determined by the iceberg-order setting and is executed at the counterparty price (buys use the best ask). **Orders are canceled immediately after submission, so it is normal to see many cancellation failures such as 400: {"code":-2011,"msg":"Unknown order sent."}.**
5. Repeat the loop.

**The strategy compares the number of symbols in `Short_symbols` and `Long_symbols`. For whichever side has more symbols, each symbol uses `Trade_value` as its target notional; for the side with fewer symbols, the required hedge value is averaged across its symbols.**

If you only short BTC and go long TRX, DASH, ONT, and QTUM with `Trade_value = 50`, then TRX, DASH, ONT, and QTUM each carry a long position worth 50, while BTC carries a short position worth `50 * 4`.

If you only go long BTC and short TRX, DASH, ONT, and QTUM with `Trade_value = 50`, then TRX, DASH, ONT, and QTUM each carry a short position worth 50, while BTC carries a long position worth `50 * 4`.

The `leverage` field in the status bar represents the used-margin ratio and should not be set too high.

## Strategy Parameters

![IMG](https://www.fmz.com/upload/asset/2c9e5e0e4c30f9eaada.png)

- Short_symbols: Symbols to short, separated by commas.
- Long_symbols: Symbols to go long. This can also be left empty to run an unhedged naked short strategy.
- Trade_value: The target short notional per symbol. Because the strategy also carries a long hedge, total notional = `2 * Trade_value * number of short symbols`. It generally uses 3x-5x leverage, so total notional is roughly `3 * account balance`. Choose this based on your total capital, and use research-environment backtests to gauge suitable leverage.
- Adjust_value: The deviation threshold for rebalancing contract value (priced in USDT). If it is too large, rebalancing is slow; if too small, fees become too high. Set it according to `Trade_value`. It cannot be lower than 20, or the order may not reach the exchange minimum size.
- Ice_value: The iceberg-order notional. It also cannot be lower than 20. The actual order size uses the smaller of `Adjust_value` and `Ice_value`.

## Strategy Risks

When the price of a shorted coin rises, the contract value increases and the strategy reduces that position; when price falls and the position is profitable, the strategy adds back to maintain constant notional exposure. This keeps total contract value stable, but altcoins can still move independently. Over a one-year cycle, altcoins may be near a bottom and could stage large rebounds. How the strategy should be used depends on your view: if you are bullish on altcoins and believe they have bottomed, you can trade the index in the opposite direction. Or, if you are bullish on several specific coins (not necessarily Bitcoin), you can hedge against those instead.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Short_symbols|TRX,DASH,ONT,QTUM,BAT,IOST,ADA,ZEC,XMR,NEO,VET,XRP,IOTA,XLM|Symbols to Short|
|Long_symbols|BTC|Symbols to Go Long|
|Trade_value|50|Per-Symbol Short Contract Value|
|Adjust_value|20|Contract Value Rebalancing Deviation|
|Ice_value|50|Iceberg Order Size|
|Log_profit_interval|20|Total Equity Log Interval (s)|
|Interval|5|Sleep Interval (s)|


> Source (javascript)

``` javascript
if(IsVirtual()){
    throw '不能回测，回测参考 https://www.fmz.com/digest-topic/5294 '
}
if(exchange.GetName() != 'Futures_Binance'){
    throw '只支持币安期货交易所，和现货交易所不同，需要单独添加，名称为Futures_Binance'
}

var short_symbols = Short_symbols.split(',')
var long_symbols = Long_symbols.split(',')

if(short_symbols.length == 1 && short_symbols[0] == ''){
    short_symbols = []
}
if(long_symbols.length == 1 && long_symbols[0] == ''){
    long_symbols = []
}
var symbols = []
for(var i=0; i<short_symbols.length; i++){
    if(short_symbols[i]){
        symbols.push(short_symbols[i])
    }
}
for(var i=0; i<long_symbols.length; i++){
    if(long_symbols[i]){
        symbols.push(long_symbols[i])
    }
}
var update_profit_time = 0
var assets = {}
var trade_info = {}
var exchange_info = HttpQuery('https://fapi.binance.com/fapi/v1/exchangeInfo')
if(!exchange_info){
    throw '无法连接币安网络，需要海外托管者'
}
exchange_info = JSON.parse(exchange_info)
for (var i=0; i<exchange_info.symbols.length; i++){
    if(symbols.indexOf(exchange_info.symbols[i].baseAsset) > -1){
       assets[exchange_info.symbols[i].baseAsset] = {amount:0, hold_price:0, value:0, bid_price:0, ask_price:0, realised_profit:0, margin:0, unrealised_profit:0}
       trade_info[exchange_info.symbols[i].baseAsset] = {minQty:parseFloat(exchange_info.symbols[i].filters[1].minQty),
                                                         priceSize:parseInt((Math.log10(1.1/parseFloat(exchange_info.symbols[i].filters[0].tickSize)))),
                                                         amountSize:parseInt((Math.log10(1.1/parseFloat(exchange_info.symbols[i].filters[1].stepSize))))
                                                        }
    }
}
assets.USDT = {unrealised_profit:0, margin:0, margin_balance:0, total_balance:0, leverage:0}


function updateAccount(){
    var account = exchange.GetAccount()
    var pos = exchange.GetPosition()
    if (account == null || pos == null ){
        Log('update account time out')
        return
    }
    assets.USDT.update_time = Date.now()
    for(var i=0; i<symbols.length; i++){
        assets[symbols[i]].margin = 0
        assets[symbols[i]].unrealised_profit = 0
        assets[symbols[i]].hold_price = 0
        assets[symbols[i]].amount = 0
        assets[symbols[i]].unrealised_profit = 0
    }
    for(var j=0; j<account.Info.positions.length; j++){
        if(account.Info.positions[j].positionSide == 'BOTH'){
            var pair = account.Info.positions[j].symbol 
            var coin = pair.slice(0,pair.length-4)
            if(symbols.indexOf(coin) < 0){continue}
            assets[coin].margin = parseFloat(account.Info.positions[j].initialMargin) + parseFloat(account.Info.positions[j].maintMargin)
            assets[coin].unrealised_profit = parseFloat(account.Info.positions[j].unrealizedProfit)
        }
    }
    assets.USDT.margin = _N(parseFloat(account.Info.totalInitialMargin) + parseFloat(account.Info.totalMaintMargin),2)
    assets.USDT.margin_balance = _N(parseFloat(account.Info.totalMarginBalance),2)
    assets.USDT.total_balance = _N(parseFloat(account.Info.totalWalletBalance),2)
    assets.USDT.unrealised_profit = _N(parseFloat(account.Info.totalUnrealizedProfit),2)
    assets.USDT.leverage = _N(assets.USDT.margin/assets.USDT.total_balance,2)
    pos = JSON.parse(exchange.GetRawJSON())
    if(pos.length > 0){
        for(var k=0; k<pos.length; k++){
            var pair = pos[k].symbol
            var coin = pair.slice(0,pair.length-4)
            if(symbols.indexOf(coin) < 0){continue}
            assets[coin].hold_price = parseFloat(pos[k].entryPrice)
            assets[coin].amount = parseFloat(pos[k].positionAmt)
            assets[coin].unrealised_profit = parseFloat(pos[k].unRealizedProfit)
        }
    }
}

function updateTick(){
    var ticker = HttpQuery('https://fapi.binance.com/fapi/v1/ticker/bookTicker')
    if(ticker == null){
        Log('get ticker time out')
        return
    }
    ticker = JSON.parse(ticker)
    for(var i=0; i<ticker.length; i++){
        var pair = ticker[i].symbol 
        var coin = pair.slice(0,pair.length-4)
        if(symbols.indexOf(coin) < 0){continue}
        assets[coin].ask_price = parseFloat(ticker[i].askPrice)
        assets[coin].bid_price = parseFloat(ticker[i].bidPrice)
        assets[coin].ask_value = _N(assets[coin].amount*assets[coin].ask_price, 2)
        assets[coin].bid_value = _N(assets[coin].amount*assets[coin].bid_price, 2)
    }
}

function trade(symbol, dirction, value){
    if(Date.now()-assets.USDT.update_time > 10*1000){
        Log('更新账户延时，不交易')
        return
    }
    var price = dirction == 'sell' ? assets[symbol].bid_price : assets[symbol].ask_price
    var amount = _N(Math.min(value,Ice_value)/price, trade_info[symbol].amountSize)
    if(amount < trade_info[symbol].minQty){
        Log(symbol, '合约调整偏离价值或冰山委托订单设置过小，达不到最小成交, 至少需要: ', _N(trade_info[symbol].minQty*price,0))
        return
    }
    exchange.IO("currency", symbol+'_'+'USDT')
    exchange.SetContractType('swap')
    exchange.SetDirection(dirction)
    var f = dirction == 'buy' ? 'Buy' : 'Sell'
    var id = exchange[f](price, amount, symbol)
    if(id){
        exchange.CancelOrder(id) //订单会立即撤销
    }
}



function updateStatus(){
        var table = {type: 'table', title: '交易对信息', 
             cols: ['币种', '数量', '持仓价格', '当前价格', '持仓价值', '保证金', '未实现盈亏'],
             rows: []}
    for (var i=0; i<symbols.length; i++){
        var price = _N((assets[symbols[i]].ask_price + assets[symbols[i]].bid_price)/2, trade_info[symbols[i]].priceSize)
        var value = _N((assets[symbols[i]].ask_value + assets[symbols[i]].bid_value)/2, 2)
        var infoList = [symbols[i], assets[symbols[i]].amount, assets[symbols[i]].hold_price, price, value,_N(assets[symbols[i]].margin,3), _N(assets[symbols[i]].unrealised_profit,3)]
        table.rows.push(infoList)
    }
    var logString = _D() + '  ' + JSON.stringify(assets.USDT) + '\n'
    LogStatus(logString + '`' + JSON.stringify(table) + '`')
    
    if(Date.now()-update_profit_time > Log_profit_interval*1000){
        LogProfit(_N(assets.USDT.margin_balance,3))
        update_profit_time = Date.now()
    }
    
}

function onTick(){
    var short_value = Trade_value
    if(short_symbols.length<long_symbols.length){
        short_value = _N(long_symbols.length*Trade_value/short_symbols.length,0)
    }
    var long_value = Trade_value
    if(short_symbols.length>long_symbols.length){
        long_value = _N(short_symbols.length*Trade_value/long_symbols.length,0)
    }
    var symbol = ''
    for(var i=0; i<short_symbols.length; i++){
        symbol = short_symbols[i]
        if(assets[symbol].ask_price == 0){ continue }
        if(assets[symbol].bid_value + short_value > Adjust_value){
            trade(symbol, 'sell', assets[symbol].bid_value + short_value)
        }
        if(assets[symbol].ask_value + short_value < -Adjust_value){
            trade(symbol, 'buy', -(assets[symbol].ask_value + short_value))
        }
    }
    for(var i=0; i<long_symbols.length; i++){
        symbol = long_symbols[i]
        if(assets[symbol].ask_price == 0){ continue }
        if(assets[symbol].bid_value - long_value > Adjust_value){
            trade(symbol, 'sell', assets[symbol].bid_value-long_value)
        }
        if(assets[symbol].ask_value - long_value < -Adjust_value){
            trade(symbol, 'buy', long_value-assets[symbol].ask_value)
        }
    }   
}

function main() {
    while(true){
        updateAccount()
        updateTick()
        onTick()
        updateStatus()
        Sleep(Interval*1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/194825

> Last Modified

2020-08-04 14:22:07
