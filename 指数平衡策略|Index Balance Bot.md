
> 策略名称

指数平衡策略|Index Balance Bot

> 策略作者

小草

> 策略描述

This bot wuill maintain a specific proportion of each asset value as you set.
If you set ETH value to 25%(0.25) of portfolio, deviation to 0.1, bot will buy to 0.25 when the value ratio is below 0.9*0.25 and sell when it is above 1.1*0.25, thus, the ETH value is kept to a certain ratio.
Balancing more than one asset, you have to add trading pair separately, and ratios is input like "0.25|0.2|0.3".
Remember, the total ratio added up must lower than 1 and has a extra room to buy.

指数平衡策略。可以将资产按预设比例进行平衡，支持跨交易所平衡。注意同意个交易所要相邻添加。

The Flash Crash Bot sets pre-orders above and below a specified base price. Buy orders are placed at predefined price points that fall below the set base price. Conversely, sell orders are placed above this base price. This bot is most effective in a volatile market.

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Ratio|0.25|0.25|0.25|assets ratio(separate by "|")|
|BaseAsset|BTC|base currency|
|ToBuy|0.1|0.1|0.1|Deviation ratio to buy|
|ToSell|0.1|0.1|0.1|Deviation ratio to sell|
|Interval|60|check interval（second)|


> 源码 (javascript)

``` javascript
var account = _C(exchanges[0].GetAccount);
var coinValue = {};
var totalValue = 0;
function updateValue(){
    var logString = 'Time: '+ _D() + '\n';
    totalValue = 0;
    coinValue[BaseAsset] = 0;
    logString += BaseAsset + ': ' + _N(coinValue[BaseAsset].value,5) + '\n';
    for(var i=0;i<exchanges.length;i++){
        var account = _C(exchanges[i].GetAccount);
        if(i > 0 && exchanges[i].GetLabel != exchanges[i-1].GetLabel){
            coinValue[BaseAsset] += {amount:account.Balance + account.FrozenBalance, value:account.Balance + account.FrozenBalance};
        }
        var ticker = _C(exchanges[i].GetTicker);
        var symbol = exchanges[i].GetCurrency().split('_')[0];
        coinValue[symbol].amount = account.Stocks + account.FrozenStocks;
        coinValue[symbol].value = coinValue[symbol].amount * ticker.Last;
        totalValue += coinValue[symbol].value;
        coinValue[symbol].buyPrice = ticker.Buy;
        coinValue[symbol].sellPrice = ticker.Sell;
        logString += symbol + ': ' + _N(coinValue[symbol].value,5) + '\n'
    }
    totalValue += coinValue[BaseAsset].value;
    LogStatus(logString);
}
var keepPercent = Ratio.split('|').map(Number);
if(math.sum(keepPercent) > 1){
    throw 'sum of keep percent should be lower than 1';
}
var buyPercent = ToBuy.split('|').map(Number);
var sellPercent = ToSell.split('|').map(Number);
for(var i=0;i<exchanges.length;i++){
    var symbol = exchanges[i].GetCurrency().split('_')[0];
    coinValue[symbol] = {amount:0, value:0, buyPrice:0, sellPrice:0, keepPercent:0, buyPercent:0, sellPercent:0};
    coinValue[symbol].keepPercent = keepPercent[i];
    coinValue[symbol].buyPercent = buyPercent[i];
    coinValue[symbol].sellPercent = sellPercent[i];
}
function CancelPendingOrders(e) {
    var orders = _C(e.GetOrders);
    for (var j = 0; j < orders.length; j++) {
        exchange.CancelOrder(orders[j].Id, orders[j]);
        Sleep(300);
    }
}
function onTick(){
    updateValue();
    for(var i=0;i<exchanges.length;i++){
        var symbol = exchanges[i].GetCurrency().split('_')[0];
        if(coinValue[symbol].value > (1+coinValue[symbol].sellPercent)*totalValue*coinValue[symbol].keepPercent){
           var sellAmount = (coinValue[symbol].value - totalValue*coinValue[symbol].keepPercent)/coinValue[symbol].buyPrice
           exchanges[i].Sell(coinValue[symbol].buyPrice, sellAmount)
           CancelPendingOrders(exchanges[i]);
        }
        else if(coinValue[symbol].value < (1-coinValue[symbol].buyPercent)*totalValue*coinValue[symbol].keepPercent){
            var buyAmount = (totalValue*coinValue[symbol].keepPercent - coinValue[symbol].value)/coinValue[symbol].sellPrice
            exchanges[i].Buy(coinValue[symbol].sellPrice, buyAmount);
            CancelPendingOrders(exchanges[i]);
        }        
    }
}
function main() {
    while(true){
        onTick();
        Sleep(Interval*1000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/116012

> 更新时间

2019-07-03 16:43:18
