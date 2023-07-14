
> Name

币安止盈止损和仓位止盈止损接口U本位合约

> Author

夏天不打你





> Source (javascript)

``` javascript
// 挂多单止损
function longStopLoss(num, symbol, price, size) {
    var time = UnixNano() / 1000000;
    var param = null;
    // var param = "symbol=" + symbol + "&quantity=" + size.toString() + "&stopPrice=" + price.toString() + "&side=SELL" + "&type=STOP_MARKET" + "&timestamp=" + time.toString();                           // 单向持仓
    if (size != 0) {
        param = "symbol=" + symbol + "&quantity=" + size.toString() + "&stopPrice=" + price.toString() + "&side=SELL" + "&type=STOP_MARKET" + "&positionSide=LONG" + "&timestamp=" + time.toString();       // 双向持仓
    } else {
        param = "symbol=" + symbol + "&closePosition=true" + "&stopPrice=" + price.toString() + "&side=SELL" + "&type=STOP_MARKET" + "&positionSide=LONG" + "&timestamp=" + time.toString();                // 仓位止盈止损
    }
    var ret = exchanges[num].IO("api", "POST", "/fapi/v1/order", param);
    Log(exchanges[num].GetLabel(), ": 挂多单止损：", ret);
    return true;
}

// 挂多单止盈
function longTakeProfit(num, symbol, price, size) {
    var time = UnixNano() / 1000000;
    var param = null;
    if (size != 0) {
        param = "symbol=" + symbol + "&quantity=" + size.toString() + "&stopPrice=" + price.toString() + "&side=SELL" + "&type=TAKE_PROFIT_MARKET" + "&positionSide=LONG" + "&timestamp=" + time.toString();       // 双向持仓
    } else {
        param = "symbol=" + symbol + "&closePosition=true" + "&stopPrice=" + price.toString() + "&side=SELL" + "&type=TAKE_PROFIT_MARKET" + "&positionSide=LONG" + "&timestamp=" + time.toString();                // 仓位止盈止损
    }
    var ret = exchanges[num].IO("api", "POST", "/fapi/v1/order", param);
    Log(exchanges[num].GetLabel(), ": 挂多单止盈：", ret);
    return true;
}

// 挂空单止损
function shortStopLoss(num, symbol, price, size) {
    var time = UnixNano() / 1000000;
    var param = null;
    // var param = "symbol=" + symbol + "&quantity=" + size.toString() + "&stopPrice=" + price.toString() + "&side=BUY" + "&type=STOP_MARKET" + "&timestamp=" + time.toString();                          // 单向持仓   
    if (size != 0) {     
        param = "symbol=" + symbol + "&quantity=" + size.toString() + "&stopPrice=" + price.toString() + "&side=BUY" + "&type=STOP_MARKET" + "&positionSide=SHORT" + "&timestamp=" + time.toString();     // 双向持仓
    } else {
        param = "symbol=" + symbol + "&closePosition=true" + "&stopPrice=" + price.toString() + "&side=BUY" + "&type=STOP_MARKET" + "&positionSide=SHORT" + "&timestamp=" + time.toString();              // 仓位止盈止损
    }
    var ret = exchanges[num].IO("api", "POST", "/fapi/v1/order", param);
    Log(exchanges[num].GetLabel(), ": 挂空单止损：", ret);
    return true;
}

// 挂空单止盈
function shortTakeProfit(num, symbol, price, size) {
    var time = UnixNano() / 1000000;
    var param = null;
    if (size != 0) {     
        param = "symbol=" + symbol + "&quantity=" + size.toString() + "&stopPrice=" + price.toString() + "&side=BUY" + "&type=TAKE_PROFIT_MARKET" + "&positionSide=SHORT" + "&timestamp=" + time.toString();     // 双向持仓
    } else {
        param = "symbol=" + symbol + "&closePosition=true" + "&stopPrice=" + price.toString() + "&side=BUY" + "&type=TAKE_PROFIT_MARKET" + "&positionSide=SHORT" + "&timestamp=" + time.toString();              // 仓位止盈止损
    }
    var ret = exchanges[num].IO("api", "POST", "/fapi/v1/order", param);
    Log(exchanges[num].GetLabel(), ": 挂空单止盈：", ret);
    return true;
}
```

> Detail

https://www.fmz.com/strategy/319427

> Last Modified

2022-06-13 11:56:29
