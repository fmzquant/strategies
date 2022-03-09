
> 策略名称

OKEX V5止盈止损接口

> 策略作者

夏天不打你





> 源码 (javascript)

``` javascript


// 挂多单止损
function longStopLossInOkex(num, symbol, price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=sell" + "&posSide=long" + "&ordType=conditional" + "&sz=" + size.toString() + "&slTriggerPx=" + price.toString() + "&slOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂多单止损：", ret);
    return true;
}

// 挂多单止盈
function longTakeProfitInOkex(num, symbol, price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=sell" + "&posSide=long" + "&ordType=conditional" + "&sz=" + size.toString() + "&tpTriggerPx=" + price.toString() + "&tpOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂多单止盈：", ret);
    return true;
}

// 挂空单止损
function shortStopLossInOkex(num, symbol, price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=buy" + "&posSide=short" + "&ordType=conditional" + "&sz=" + size.toString() + "&slTriggerPx=" + price.toString() + "&slOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂空单止损：", ret);
    return true;
}

// 挂空单止盈
function shortTakeProfitInOkex(num, symbol, price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=buy" + "&posSide=short" + "&ordType=conditional" + "&sz=" + size.toString() + "&tpTriggerPx=" + price.toString() + "&tpOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂空单止盈：", ret);
    return true;
}



function main() {
    shortTakeProfitInOkex(0, "ETH_USDT", 2800, 1);
}
```

> 策略出处

https://www.fmz.com/strategy/340820

> 更新时间

2022-01-14 22:29:15
