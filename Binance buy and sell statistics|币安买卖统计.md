
> 策略名称

Binance buy and sell statistics|币安买卖统计

> 策略作者

小草

> 策略描述

记录主动成交数据，反映了买卖盘的活跃程度

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Interval|600|Log interval（second)|
|Pair|btcusdt|trading pair|


> 源码 (javascript)

``` javascript
var tradeHistory = {buyData:{amount:0, money:0}, sellData:{amount:0, money:0}}
if(_G('tradeHistory')){
    tradeHistory = _G('tradeHistory')
}
function onexit(){
    Log('exit，saving data...')
    _G('tradeHistory', tradeHistory)
}
function main(){
    var client = Dial("wss://stream.binance.com:9443/ws/" + Pair.toLowerCase() + "@trade", 60)
    var updateTime = new Date().getTime()
    while(true){
        var trade = JSON.parse(client.read())
        if(trade.m){
            tradeHistory.sellData.amount += parseFloat(trade.q)
            tradeHistory.sellData.money += parseFloat(trade.q) * parseFloat(trade.p)
        }else{
            tradeHistory.buyData.amount += parseFloat(trade.q)
            tradeHistory.buyData.money += parseFloat(trade.q) * parseFloat(trade.p)
        }
        var buyNet = _N(tradeHistory.buyData.money - tradeHistory.sellData.money, 3)
        logSting = 'active buy amount：' + _N(tradeHistory.buyData.amount, 3) + '  total money: ' + _N(tradeHistory.buyData.money, 3) + '\n'
        logSting += 'active sell amount：' + _N(tradeHistory.sellData.amount, 3) + '  total money: ' + _N(tradeHistory.sellData.money, 3) + '\n'
        logSting += 'Net inflow of funds: ' +　_N(tradeHistory.buyData.money - tradeHistory.sellData.money, 3)
        LogStatus(logSting)
        if(new Date().getTime() - updateTime > Interval*1000){
            updateTime = new Date().getTime()
            LogProfit(buyNet)
            $.PlotLine('buyNet', buyNet)
            $.PlotLine('buy', _N(tradeHistory.buyData.money,3))
            $.PlotLine('sell', _N(tradeHistory.sellData.money,3))
            Log(logSting)
        }
    }
}
```

> 策略出处

https://www.fmz.com/strategy/121917

> 更新时间

2019-07-03 16:35:27
