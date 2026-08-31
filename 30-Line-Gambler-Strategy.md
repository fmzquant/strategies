
> Name

30-Line-Gambler-Strategy

> Author

发明者量化-小小梦



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|_StopWin|500|Take profit|
|_StopLoss|500|Stop loss|
|_FirstAmount|0.01|Order size per trade|
|_MaxGear|8|Number of martingale doublings|


> Source (javascript)

``` javascript
var hold = {price : 0, amount : 0}
var _Gear = 0
function main(){
    var initAccount = _C(exchange.GetAccount)
    Log(initAccount, "#FF0000")
    while(1){
        var ticker = _C(exchange.GetTicker)
        if(hold.amount == 0){
            var firstInfo = $.Buy(_FirstAmount)
            hold.amount = firstInfo.amount
            hold.price = firstInfo.price
        } else {
            if(ticker.Sell > hold.price + _StopWin){
                var coverStopWinInfo = $.Sell(hold.amount)
                hold.price = 0
                hold.amount = 0
                _Gear = 0
            } else if(ticker.Sell < hold.price - _StopLoss && _Gear < _MaxGear){
                $.Sell(hold.amount)
                var amount = hold.amount * 2
                var addInfo = $.Buy(amount)
                hold.price = addInfo.price
                hold.amount = addInfo.amount
                _Gear++
            }
        }
        LogStatus(_D(), "加倍下注次数：", _Gear, "\n", "当前持仓：", hold)
        Sleep(500)
    }
}
```

> Detail

https://www.fmz.com/strategy/113796

> Last Modified

2018-08-31 10:43:45
